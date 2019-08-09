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

    render() {
        return(
            <div>
                <input
                    type='text'
                    placeholder='enter your meesage'
                    onChange={this.onChange}
                />
                <button
                    // onClick={}
                >SEND</button>
            </div>
        )
    }
}

export default AddMessage;