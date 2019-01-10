import React, {Component} from 'react';


class Message extends Component {
    render(){
        const prop = this.props.message
        switch (prop.type) {
            
            case 'incomingMessage':
                return (
                    <div className="message">
                        <span className="message-username" style={{ color: prop.textColor }}> {prop.currentUser}</span>
                        <span className="message-content">{prop.content}</span>
                    </div>
                )
            
                case 'incomingNotification':
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