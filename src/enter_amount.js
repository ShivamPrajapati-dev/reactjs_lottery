import React from 'react';

const EnterAmount = (props) =>{
  return (
    <input onChange = {event=>{props.value(event.target.value)}}>

    </input>
  );
}

export default EnterAmount;
