import React from 'react';
import './App.css';
import Messages from './Messages/Messages';
import AddMessage from './AddMessage/AddMessage';


function App() {
  return (
    <div className="App">
      <h1>CHAT</h1>
      <div className="messages-wrapper">
        <Messages/>
      </div>
      <div className="addMessage">
        <AddMessage/>
      </div>
    </div>
  );
}

export default App;
