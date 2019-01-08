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
    }
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
          <ChatBar />
        </div>
      </div>
    );
  }
}
export default App;
