import React from 'react';

const ProceedToEnter = (props) => {
  return (
  <div className = 'bt'>
   <button
       className ="btn btn-primary"
       type="submit"
       onClick = {event=>props.onSubmit(event)}
       > Enter </button>
  </div>
  );
}

export default ProceedToEnter;
