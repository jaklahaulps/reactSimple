import React, {Component} from 'react';
import messages from './Message.jsx';

class MessageList extends Component {

    render() {
        console.log("TEST: ",this.props.messages)
        return (
            <main className="messages">
                <div className="message">
                    <span className="message-username">{this.props.messages[0].username}</span>
                    <span className="message-content">{this.props.messages[0].content}</span>
                </div>
                <div className="message">
                    <span className="message-username">{this.props.messages[1].username}</span>
                    <span className="message-content">{this.props.messages[1].content}</span>
                </div>                
            </main>
        )
    }
}

export default MessageList;