import React from 'react';
import './App.css';
import Messages from './Messages/Messages';
import AddMessage from './AddMessage/AddMessage';


class App extends React.Component {

  getUserName = (name) => {
    const input = document.querySelector('input');
    input.value = name+" : ";
    console.log('usName --', name );
    
  }

  render(){
    return (
      <div className="App">
        <h1>CHAT</h1>
        <div className="messages-wrapper">
          <Messages
            getUserName={this.getUserName}
          />
        </div>
        <div className="addMessage">
          <AddMessage/>
        </div>
      </div>
    );
  }
  
}

export default App;
