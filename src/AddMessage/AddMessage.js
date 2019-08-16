import React from 'react';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './AddMessage.css';

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
    }

    startWebSocet = (mes) =>{
        const { setOnline } = this.props;
        let message = mes;
        const ws = new WebSocket('wss://wssproxy.herokuapp.com/');
        ws.onopen = () => {
            if (this.state.messageBuffer.length) {
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
        e.persist();
        if(e.charCode === 13){
            this.sendMessage()
        }
    }

    render() {
        return(
            <div className='addMessage-wrapper'>
                <InputGroup className="mb-3">
                    <FormControl
                        className="addMessage-inputMessage"
                        placeholder=' Enter your meesage'
                        autoFocus
                        onKeyPress={this.add}
                        onChange={this.onChange}
                    />  
                    <Button
                        variant="warning"
                        onClick={this.sendMessage}
                    >SEND</Button>
                </InputGroup>
            </div>
        )
    }
}

export default AddMessage;