import React from 'react'

const PLAY = "fas fa-play";
const PAUSE = "fas fa-pause";
const RESET = "fas fa-undo";

const TimerButton = props => {
    const icon =
      props.buttonType === "start_stop" ? (props.counting ? PAUSE : PLAY) : RESET;
    return <i id={props.buttonType} className={icon} onClick={props.onClick} />;
  };
  
export default TimerButton;

