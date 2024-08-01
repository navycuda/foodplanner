import React from 'react';


export interface DayProps{
  
}


export default function Day(props) {

  return (
    <div>

    {!index && 
      <h3>Today:</h3>
    }

    <div>
      {dayOfTheWeek}
    </div>
    
    
    <div>
      recipe
    </div>

    {!index &&
      <hr/>
    }
  </div>
  );
};