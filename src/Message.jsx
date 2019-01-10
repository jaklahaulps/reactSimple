import React, {Component} from 'react';


class Message extends Component {
    render(){
        const prop = this.props.message
        console.log("text color", this.props.message.textColor)
        switch (prop.type) {
            
            case 'incomingMessage':
                console.log("Incoming Notification render: ",prop)
                return (
                    <div className="message">
                        <span className="message-username" style={{ color: prop.textColor }}> {prop.currentUser}</span>
                        <span className="message-content">{prop.content}</span>
                    </div>
                )
            
                case 'incomingNotification':
                console.log("Incoming Notification render: ",prop)
                return (
                    <div className="message">
                        <span className="message-content">{prop.content}</span>
                    </div>
                )
            
            default:           
        }
    }
}

export default Message;