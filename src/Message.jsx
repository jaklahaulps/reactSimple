import React, {Component} from 'react';


class Message extends Component {
    render(){
        switch (this.props.message.type) {
            
            case 'incomingMessage':
                console.log("Incoming Notification render: ",this.props.message)
                return (
                    <div className="message">
                        <span className="message-username">{this.props.message.currentUser}</span>
                        <span className="message-content">{this.props.message.content}</span>
                    </div>
                )
            
                case 'incomingNotification':
                console.log("Incoming Notification render: ",this.props.messages)
                return (
                    <div className="message">
                        <span className="message-content">{this.props.message.content}</span>
                    </div>
                )
            
            default:           
        }
    }
}

export default Message;