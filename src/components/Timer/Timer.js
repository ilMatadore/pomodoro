import React from 'react'

const Timer = props => {
    const minutes = Math.floor(props.currentDuration / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (props.currentDuration % 60).toString().padStart(2, "0");
    return (
      <div id="timer">
        <h2 id="timer-label">{props.currentInterval}</h2>
        <time id="time-left">
          {minutes}:{seconds}
        </time>
      </div>
    );
  };

export default Timer;