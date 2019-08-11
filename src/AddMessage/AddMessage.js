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
        // console.log('e.value -- ', e.target.value, this.state);    
    };

    componentDidMount(){
        // const {login} = this.props;
        this.startWebSocet()
        // console.log('add mes login -- ', login);
        
    }

    componentDidUpdate(e){
        
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
        
        console.log(' addMessage did up date --##################### ', this.state.messageBuffer.length);
    }

    startWebSocet = (mes) =>{
        const { setOnline } = this.props;
        let message = mes;
       
        const ws = new WebSocket('ws://st-chat.shas.tel');
        ws.onopen = () => {
            if (this.state.messageBuffer) {
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
            setTimeout(() => {this.startWebSocet()}, 5000);
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

        // console.log('but onclik', this.state);
        // const ws = new WebSocket('ws://st-chat.shas.tel');
        // ws.onopen = () => {
        //     ws.send(
        //         JSON.stringify(mes)
        //     )
        // }
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