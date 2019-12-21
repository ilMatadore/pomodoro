import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="pomodoro">
        <h2 id="title">Pomodoro Clock</h2>
        <div id="break-control">
          <div id="break-label">Break Length</div>
          <button id="break-decrement">-</button>
          <div id="break-length">5</div>
          <button id="break-increment">+</button>
        </div>
        <div id="session-control">
        <div id="session-label">Session Length</div>
          <button id="session-decrement">-</button>
          <div id="session-length">25</div>
          <button id="session-increment">+</button>
        </div>
          <div id="timer-control">
            <div id="timer-label">Session</div>
            <div id="time-left">15:00</div>
            <button id='start-stop'>Play/Pause</button>
            <button id='reset'>Reset</button>
          </div>
      </div>
    );
}
}
export default App;
