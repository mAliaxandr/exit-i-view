import React from 'react';
import './App.css';
import Messages from './Messages/Messages';
import AddMessage from './AddMessage/AddMessage';
import LogIn from './LogIn/LogIn';


class App extends React.Component {
  state = {
    login: null,
  }

  setLogin = (login) => {
    console.log('app setLogin -- ', login);
    
    this.setState({login});
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
