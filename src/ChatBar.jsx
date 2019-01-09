import React, {Component} from 'react';

class ChatBar extends Component {
    
    
    render() {
        
        
        let messageInput = (event) => {
            if (event.key === 'Enter') {
                console.log("Enter was hit", event);
                const keys = event.target.value;
                this.props.newText(keys);
                event.target.value = "";
            }
        }

        return (
            <footer className="chatbar">
                <input name="chatbarUsername" className="chatbar-username" placeholder="Your Name (Optional)" />
                <input id="chatbarMessage" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress ={messageInput}/>
            </footer>
        )
    }
}

export default ChatBar;