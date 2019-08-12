import React from 'react';
import './Messages.css';
import { DateTime } from 'luxon';

class Messages extends React.Component {
    state={
        messages: [],
    }

    startWebSocet = () =>{
        const { setOnline } = this.props;
        let newMessage = null;
        let messages = null;
        const ws = new WebSocket('wss://wssproxy.herokuapp.com/');
        ws.onopen = () => {
            this.setState({online: true})
            setOnline(true);
        }
        ws.onclose = () =>{
            console.log('eeeeeeeeeeeeeeeeerrrrrrrrrrrrr');
            this.setState({online: false})
            setOnline(false);
            setTimeout(() => {this.startWebSocet()}, 5000);
        }
        ws.onmessage = (e) => {
            const newMessageParse = JSON.parse(e.data);
            newMessage = newMessageParse.reverse();
            messages = this.state.messages.concat(newMessage);
            // console.log('MsgS  eData = ', newMessage);
            this.setState({messages : messages})
            console.log('MsgS  state == ', this.state);
        }  
    }

    componentDidMount(){
          this.startWebSocet()
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate(){
        this.scrollToBottom();
    }

    getNameForMessage = (e) => {
        const {getName} = this.props;
        getName(e.target.id)
    }

    getRealDate = (time) => {
        const date = DateTime.fromMillis(time);
        let minute = null;
        let second = null;
        let month = null;
        if (date.c.minute < 10 ) {
            minute = '0'+date.c.minute;
        } else {
            minute = date.c.minute;
        }
        if ( date.c.second < 10){
            second = '0'+date.c.second;
        }else {
            second = date.c.second;
        } 
        if ( date.c.month < 10){
            month = '0'+ date.c.month;
        }else {
            month = date.c.month;
        }
        const userDate = date.c.hour+':'+minute+':'+second+" <"+date.c.day+' : '+month+' : '+date.c.year+' >';
        return(
            userDate
        )  
    }

    render() {
		let messages;
		if(this.state.messages){
            messages = this.state.messages.map( (item, index) => {
            const date = this.getRealDate(item.time);

            return(
                <li key={index}>
                    <div
                        id={item.from}
                        className='message-name'
                        onClick={this.getNameForMessage}
                    >
                        {item.from}
                    </div> 
                    <span className='message-time'> {date} </span>
                    <div className='message-message'>{item.message}</div>
                    <hr/>
                </li>
            )
                

            }
            )
		}

        return (<ul className="messages-list">
					<li>
						<h4 className="message-header">Messages</h4>
					</li>
                    {messages}
                    
                        <div className='messages-list-bottom' ref={(el) => { this.messagesEnd = el; }}></div>
                    
				</ul>)
	}
}

export default Messages;