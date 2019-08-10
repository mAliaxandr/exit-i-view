import React from 'react';
import './App.css';
import Messages from './Messages/Messages';
import AddMessage from './AddMessage/AddMessage';
import LogIn from './LogIn/LogIn';


class App extends React.Component {
  state = {
    login: null,
    online: false,
  }

  componentDidUpdate() {
    console.log('APP upDate stage -- ', this.state);
    if (this.state.online !== true) {
      // this.setOnline();
    }
    // this.setState({online: "tru?"})
  }
  

  setOnline = (online) => {
    this.setState({online: online})
  }

  setLogin = (login) => {
    console.log('app setLogin -- ', login);
    
    this.setState({login : login});
  }

  getName = (name) => {
    const input = document.querySelector('.addMessage-inputMessage');
    input.value = name+" : ";
  }

  render(){
    return (
      <div className="App">
        <h1>CHAT</h1>
        <LogIn
          setLogin={this.setLogin}
        />
        <div className="messages-wrapper">
          <Messages
            getName={this.getName}
            setOnline={this.setOnline}
          />
        </div>
        <div className="addMessage">
          <AddMessage
            login={this.state.login}
          />
        </div>
      </div>
    );
  }
  
}

export default App;
