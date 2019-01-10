import React, {Component} from 'react';

class ClientCounter extends Component {
    
    
    render() {
        return (
            <a className='numClients'> There are {this.props.numOfClients} Chatty users connected</a>
        )
    }
}

export default ClientCounter;