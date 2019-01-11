import React, {Component} from 'react';


class Message extends Component {
    render(){
        const prop = this.props.message
        switch (prop.type) {
            
            case 'incomingMessage':
                const pattern = new RegExp(/.*\/.*\.(jpg|gif|png)$/g);
                if (pattern.test(prop.content)){
                    console.log("image render: ",pattern, prop.content)
                    return (
                        <div className="message">
                            <span className="message-username" style={{ color: prop.textColor }}> {prop.currentUser}</span>
                            <span className="message-content"><img src={prop.content}/></span>
                        </div>
                    )
                } else {
                    console.log("message render", prop.content)
                    return (
                        <div className="message">
                            <span className="message-username" style={{ color: prop.textColor }}> {prop.currentUser}</span>
                            <span className="message-content">{prop.content}</span>
                        </div>
                    )
                }
            
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