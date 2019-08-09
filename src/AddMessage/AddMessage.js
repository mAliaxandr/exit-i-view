import React from 'react';

class AddMessage extends React.Component{
    state={
        AddMessage : null,
    }

    onChange = (e) => {
        let messageForSend = e.target.value;
        this.setState({AddMessage : messageForSend});
        console.log('e.value -- ', e.target.value, this.state);    
    };

    componentDidMount(){
        console.log('didMount -- ', this.state);
        
    }

    sendMessage = () => {
        let mes = {
            from: 'Jun',
            message: this.state.AddMessage,
        }
        this.setState({AddMessage : null});
        console.log('but onclik', this.state);
        const ws = new WebSocket('ws://st-chat.shas.tel');
        ws.onopen = () => {
            ws.send(
                JSON.stringify(mes)
            )
        }
    }

    render() {
        return(
            <div>
                <input
                    type='text'
                    placeholder='enter your meesage'
                    onChange={this.onChange}
                />
                <button
                    onClick={this.sendMessage}
                >SEND</button>
            </div>
        )
    }
}

export default AddMessage;