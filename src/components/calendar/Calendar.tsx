import React from 'react';
import "./Calendar.css";
import { useCalendar } from '../../state/uses/useCalendar';

export interface CalendarProps{

}

export default function Calendar(props:CalendarProps) {
  const { days, setDays } = useCalendar();
  const formatDate = (date: Date):string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  const today = new Date();
  const daylist = Array.from({ length: days }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    const dayOfTheWeek = formatDate(date);
    return (
      <div key={dayOfTheWeek}>

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
  });

  return (
    <div className='calendar'>
      <h2>Calenedar</h2>

      <input 
        type="number" 
        name="numberofdays"
        value={days}
        onChange={(e)=>setDays(parseInt(e.target.value))}
      />

      <ul>
        {daylist}
      </ul>
    </div>
  );
}