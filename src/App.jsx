import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import messageData from './messageData.json';



class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: "Annoymous",
      messages: [],
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
      const json = JSON.parse(payload.data)
      const oldTexts = this.state.messages;
      const newTexts = [...oldTexts, json]
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
    const oldTexts = this.state.messages;
    const newTexts = [...oldTexts, setProfile]
    
    this.socket.send(JSON.stringify(setProfile));
    // this.setState({
    //   messages: newTexts,
    // })
  };

  // updates state name. New feature needs to assign a new object to the current user name array.
  // name object assigned structure needs to carry {"type", "username"}
  _newName = (newName) => {
    console.log("inside newName")
    let setProfile= {
      "type": "postNotification",
      "username": this.state.currentUser,
      "content": newName, 
    }
    this.socket.send(JSON.stringify(setProfile));
    this.setState(this.state.currentUser = newName)
  }
}
export default App;
