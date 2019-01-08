import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import messageData from './messageData.json';


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUsers: messageData.currentUsers,
      messages: messageData.messages,
    };
    

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
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
          <ChatBar newText = {this._newText}/>
        </div>
      </div>
    );
  }

  _newText = (text) => {
    let setProfile= {
      "username": "Bob",
        "content": text,
        "id": (Math.random()),
    }
    const oldTexts = this.state.messages;
    const newTexts = [...oldTexts, setProfile]
    this.setState({
      messages: newTexts,
    })
  };
}
export default App;
