import React from 'react';
import "./Input.css";

export interface InputProps{
  id: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
}

export default function Input(props:InputProps) {

  return (
    <div className='input'>
      <label htmlFor={props.id}>{props.name}</label>
      <input type={props.type} name={props.id}/>
    </div>
  );
}