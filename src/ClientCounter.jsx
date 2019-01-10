import React, {Component} from 'react';

class ClientCounter extends Component {
    
    
    render() {
        console.log("at ClientCounter: ", this.props.numOfClients)
        return (
            <a className="numClients"> There are {this.props.numOfClients} Chatty users connected</a>
        )
    }
}

export default ClientCounter;