import React from 'react';
import './App.css';

import Timer from './components/Timer/Timer';
import TimerButton from './components/timerButton/timerButton';
import Setter from './components/setter/setter';


const BEEP = "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3";

const BREAK = 5;
const SESSION = 25;

const DEFAULT = {
  break: BREAK,
  session: SESSION,
  currentInterval: "Session",
  currentDuration: SESSION * 60,
  counting: false
};

class Clock extends React.Component {
  constructor() {
    super();
    this.state = DEFAULT;
  }
  
  componentDidMount = () => {
    this.audio = document.getElementById("beep");
  }

  handleClick = event => {
    const element = event.target.id;
    switch (element) {
      case "start_stop":
      case "reset":
        this.toggleTimer(element);
        break;
      case "break-increment":
      case "break-decrement":
      case "session-increment":
      case "session-decrement":
        this.toggleLength(element);
        break;
      default:
    }
  };

  toggleTimer = element => {

    switch (element) {
      case "start_stop":
        this.toggleStartStop();
        break;
      case "reset":
        this.audio.pause();
        this.audio.currentTime = 0;
        if (this.timerId) {
          clearInterval(this.timerId);
        }
        this.setState(DEFAULT);
        break;
        default:
    }
  };

  toggleStartStop = () => {
    if (this.state.counting) {
      clearInterval(this.timerId);
      this.setState({ counting: false });
    } else {
      this.setState({ counting: true });
      this.timerId = setInterval(this.tick, 1000);
    }
  };

  tick = () => {
    const currentDuration = this.state.currentDuration
    if (!currentDuration) {
      this.changeInterval()
    } else {
      const newDuration = currentDuration - 1;
      if (newDuration === 0) {
        let count = 0
        this.audio.onended = () => {
          if (count < 2) {
            count ++
            this.audio.play()
          }
        }
        this.audio.play()
      }
      this.setState({
        currentDuration: newDuration
      })
    }
  };

  changeInterval = () => {
    const newInterval = this.state.currentInterval === "Session" ? "Break" : "Session"
    const newDuration = this.state[newInterval.toLowerCase()] * 60
    this.setState({
      currentInterval: newInterval,
      currentDuration: newDuration
    })
  }

  toggleLength = element => {
    if (!this.state.counting) {
      const interval = element.split("-")[0];
      const change = element.split("-")[1];
      const currentDuration = this.state[interval]
      let newDuration
      if (change === "increment" && currentDuration < 60) {
        newDuration = currentDuration + 1
      } else if (change === "decrement" && currentDuration > 1) {
        newDuration = currentDuration - 1
      } else {
        newDuration = currentDuration
      }
      let newState = {};
      newState[interval] = newDuration;
      if (
        this.state.currentInterval ===
        interval[0].toUpperCase() + interval.slice(1)
      ) {
        newState.currentDuration = newDuration * 60;
      }
      this.setState(newState);
    }
  };

  render() {
    return (
      <div id="clock">
        <h1>Pomodoro Clock</h1>
        <div className="setter-container">
          <Setter
            setType="break"
            length={this.state.break}
            onClick={this.handleClick}
          />
          <Setter
            setType="session"
            length={this.state.session}
            onClick={this.handleClick}
          />
        </div>
        <Timer
          currentInterval={this.state.currentInterval}
          currentDuration={this.state.currentDuration}
        />
        <div className="timerButton-container">
          <TimerButton
            buttonType="start_stop"
            onClick={this.handleClick}
            counting={this.state.counting}
          />
          <TimerButton
            buttonType="reset"
            onClick={this.handleClick}
            counting={this.state.counting}
          />
        </div>
        <audio id="beep" src={BEEP} preload="auto"/>
      </div>
    );
  }
}

export default Clock;

