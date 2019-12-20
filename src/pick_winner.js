import React from 'react';

const PickWinner = (props) => {
  return (
  <div className = 'bt'>
   <button
      className ="btn btn-primary"
       type="submit"
       onClick = {event=>props.selectWinner()}
       > Pick Winner </button>
  </div>
  );
}

export default PickWinner;
