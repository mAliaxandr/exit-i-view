import React from 'react';
import './Messages.css';

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

    render() {

		let messages;

		if(this.state.messages){
            messages = this.state.messages.map( (item, index) => 
            <li key={index}>
                <div className='message-name'>{item.from}<span className='message-time'>{item.time}</span></div> 
                <span className='message-message'>{item.message}</span>
                <hr/>
            </li>)
		}

        return (<ul className="list-group">
					<li className="list-group-item">
						<h4 className="message-header">Messages</h4>
					</li>
                    {messages}
                    <li>
                        <div 
                            // style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </li>
				</ul>)
	}
}

export default Messages;