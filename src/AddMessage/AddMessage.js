import React from 'react';

class AddMessage extends React.Component{
    state={
        AddMessage : null,
        login: null,
    }

    onChange = (e) => {
        let messageForSend = e.target.value;
        this.setState({AddMessage : messageForSend});
        console.log('e.value -- ', e.target.value, this.state);    
    };

    componentDidMount(){
        const {login} = this.props;
        
        console.log('add mes login -- ', login);
        
    }

    componentDidUpdate(e){
        
        const {login} = this.props;
        if(!this.state.login && login) {
            this.setState({login});
        }

        if(this.state.login && !login) {
            this.setState({login:null});
        }
        
        console.log(' addMessage did up date -- ', this.state, login);
    }

    sendMessage = () => {
        if ( !this.state.AddMessage || !this.state.login) {
            return
        }
        let mes = {
            from: this.state.login,
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
        const input = document.querySelector('.addMessage-inputMessage');
        input.value = '';   
    }

    render() {
        return(
            <div>
                <input
                    className="addMessage-inputMessage"
                    type='text'
                    autoFocus
                    placeholder=' Enter your meesage'
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