import React, {Component} from 'react';

class ChatBar extends Component {
    
    
    render() {
        
        let messageInput = (event) => {
            if (event.key === 'Enter') {
                if (event.target.value.trim() == ''){
                    alert('Please enter a message');
                } else {
                    const keys = event.target.value;
                    this.props.newText(keys);
                    event.target.value = '';
                }
            }
        }

        let nameInput = (event) => {
            if (event.key === 'Enter') {
                const keys = event.target.value;
                this.props.newName(keys);
            }
        }

        return (
            <footer className="chatbar">
                <input name="chatbarUsername" className="chatbar-username" placeholder="Your Name (Optional)" onKeyPress = {nameInput}/>
                <input id="chatbarMessage" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress ={messageInput}/>
            </footer>
        )
    }
}

export default ChatBar;