import React from 'react'

const INCREMENT = "fas fa-plus";
const DECREMENT = "fas fa-minus";

const SetButton = props => {
    const icon =
      props.buttonId.split("-")[1] === "increment" ? INCREMENT : DECREMENT;
    return <i id={props.buttonId} className={icon} onClick={props.onClick} />;
  };

export default SetButton;
