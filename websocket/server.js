// server.js
const WebSocket = require('ws')
const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuidv4');
const randomHexColor = require('random-hex-color');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  
//Count current users, broadcast current user count.
  const numConnected = {
      type: 'numOfClients',
      numClients: wss.clients.size,
    };
  wss.broadcastJSON (numConnected);
  
  //if socket does not have a text color assigned, assign one to user's ws object.
  if (ws.textColor === undefined) {
    ws.textColor = randomHexColor();
  }

  //When message is received.
  ws.on('message', data => {
    const objData = JSON.parse(data);
    wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

    switch (objData.type) {
      
      case 'postMessage':
        const objectToBroadcast = {
            currentUser: objData.username,
            id: uuid(),
            content: objData.content,
            type: 'incomingMessage',
            textColor: ws.textColor,
        };
        wss.broadcastJSON(objectToBroadcast);
        break;
      
      case 'postNotification':
      const objectToBroadcast02 = {
        currentUser: objData.content,
        id: uuid(),
        content: `${objData.username} has changed their name to ${objData.content}`,
        type: 'incomingNotification'
      };
      wss.broadcastJSON(objectToBroadcast02);
      break;
      default:
    }
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
