import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import ClientCounter from './ClientCounter.jsx';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: "Anonymous",
      messages: [],
      numOfClients: 0,
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://localhost:3001');
    console.log(this.socket)
    
    this.socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    this.socket.onmessage = payload => {
      const json = JSON.parse(payload.data);
      const oldTexts = this.state.messages;
      const newTexts = [...oldTexts, json];
      console.log('Got message from server', json)
      switch (json.type) {
        
        case 'incomingMessage':
          console.log(json.content, json.type)
          this.setState({
            messages: newTexts,
          })
          break;
        
        case 'incomingNotification':
          console.log("Incoming Notification: ",json)
          this.setState({
            messages: newTexts,
          })
          break;
        
        case 'numOfClients':
          const numClients = json.numClients
          console.log("number of clients connected: ",numClients)
          this.setState({
            numOfClients: numClients,
          })
          console.log("Display numOfClients- Post update: ", this.state.numOfClients)
          break; 

        default:
      }
    };

    this.socket.onclose= () => {
      console.log('Disconnected from the WebSocket');
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <ClientCounter numOfClients= {this.state.numOfClients}/>
        </nav>
        <div>
          <MessageList messages={this.state.messages}/>
        </div>
        <div>
          <ChatBar newText = {this._newText} newName = {this._newName}/>
        </div>
      </div>
    );
  }
  // sends new text message to socket server
  _newText = (text) => {
    let setProfile= {
      "type" : "postMessage",
      "username": this.state.currentUser,
      "content": text,
    }

    this.socket.send(JSON.stringify(setProfile));
  };

  // updates state name. New feature needs to assign a new object to the current user name array.
  // name object assigned structure needs to carry {"type", "username"}
  _newName = (newName) => {
    console.log("inside newName")
    let setProfile = {
      "type": "postNotification",
      "username": this.state.currentUser,
    }
    if (newName !== "") {
      setProfile.content = newName; 
    } else {
      setProfile.content = "Anonymous";
    }
    if (setProfile.content === this.state.currentUser) {
      alert("No change to username")
    } else {
      this.socket.send(JSON.stringify(setProfile));
      return this.setState(this.state.currentUser = setProfile.content)
    }

    
    
  }
  // function update number of clients on chat

}
export default App;
