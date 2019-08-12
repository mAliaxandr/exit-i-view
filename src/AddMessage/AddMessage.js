import React from 'react';

class AddMessage extends React.Component{
    state={
        AddMessage : null,
        login: null,
        online: false,
        messageBuffer:[],
    }

    onChange = (e) => {
        let messageForSend = e.target.value;
        this.setState({AddMessage : messageForSend});
    }

    componentDidMount(){
        this.startWebSocet()   
    }

    componentDidUpdate(){
        const {login} = this.props;
        if(!this.state.login && login) {
            this.setState({login});
        }
        if(this.state.login && !login) {
            this.setState({login:null});
        }
        if (this.state.messageBuffer.length && this.state.online) {
            this.startWebSocet();
        } 
        console.log(' addMessage did up date --##################### ', this.state);
    }

    startWebSocet = (mes) =>{
        const { setOnline } = this.props;
        let message = mes;
        const ws = new WebSocket('wss://wssproxy.herokuapp.com/');
        ws.onopen = () => {
            if (this.state.messageBuffer.length) {
                console.log('dddddddddddddddddddd');
                
                this.state.messageBuffer.forEach((item) => {
                    ws.send(
                        JSON.stringify(item)
                    )   
                })
                this.setState({messageBuffer:[]})
            }
            this.setState({online: true})
            setOnline(true);
            ws.send(
                JSON.stringify(message),
                message = null
            )
        }
        ws.onclose = () =>{
            if (message) {
                this.state.messageBuffer.push(message);
            }
            console.log('ADD messs  ON CLOSE');
            this.setState({online: false})
            setOnline(false);
            if (this.state.messageBuffer.length) {
                setTimeout(() => {this.startWebSocet()}, 5000);
            }
               
        }   
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
        this.startWebSocet(mes)
        const input = document.querySelector('.addMessage-inputMessage');
        input.value = '';   
    }

    add = (e) => {
        console.log('add', e.charCode);
        e.persist();
        if(e.charCode === 13){
            this.sendMessage()
        }
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
                    onKeyPress={this.add}
                />
                <button
                    onClick={this.sendMessage}
                >SEND</button>
            </div>
        )
    }
}

export default AddMessage;