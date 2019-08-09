import React from 'react';
import './App.css';
import Messages from './Messages/Messages'


function App() {
  return (
    <div className="App">
      <h1>CHAT</h1>
      <div className="messages-wrapper">
        <Messages/>
      </div>
    </div>
  );
}

export default App;
