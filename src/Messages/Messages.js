import React from 'react';
import './Messages.css';
import { DateTime } from 'luxon';

class Messages extends React.Component {
    state={
        messages: [],
    }

    componentDidMount(){
        let newMessage = null;
        let messages = null;
        const ws = new WebSocket('ws://st-chat.shas.tel');
        ws.onmessage = (e) => {
            const newMessageParse = JSON.parse(e.data);
            newMessage = newMessageParse.reverse();
            messages = this.state.messages.concat(newMessage);
            console.log('eData = ', newMessage);
            this.setState({messages : messages})
            console.log('state == ', this.state);
        }    
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
                    <span className='message-message'>{item.message}</span>
                    <hr/>
                </li>
            )
                

            }
            )
		}

        return (<ul className="list-group">
					<li className="list-group-item">
						<h4 className="message-header">Messages</h4>
					</li>
                    {messages}
                    <li>
                        <div ref={(el) => { this.messagesEnd = el; }}></div>
                    </li>
				</ul>)
	}
}

export default Messages;