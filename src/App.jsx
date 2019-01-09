import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import messageData from './messageData.json';



class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: "Bob",
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
        case 'textmessage':
          console.log(json.content, json.type)
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

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, currentUser: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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

  _newText = (text) => {
    let setProfile= {
      "type" : "textmessage",
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
  _newName = (text) => {
    this.setState({
      currentUser: text
    })
  }
}
export default App;
