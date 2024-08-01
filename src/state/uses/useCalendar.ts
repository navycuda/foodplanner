import { useState, useEffect, useReducer } from "react"
import { getStore, putData } from "../IndexedDB";
import { CalendarActions } from "../StateActions";
import { CalendarState, InitialCalendarState, InitialState } from "../InitialState";


const reducer = (state:InitialCalendarState,action:{type:CalendarActions,payload:unknown}) => {
  const _state = {...state};
  const { type, payload } = action;

  switch (type){
    case CalendarActions.loadState:{
      return { ...state, ...payload as object};
    }
    case CalendarActions.setDays:{
      _state.days = payload as number;
      return _state;
    }
  }
  return state;
}


export const useCalendar = ():CalendarState => {
  const [ state, dispatch ] = useReducer(reducer,InitialState.calendar);
  const dispatcher = (type:CalendarActions, payload:unknown) => {
    dispatch({type,payload});
  }



  const setDays = (days:number):void => {
    putData("calendar",days,"days")
      .then(()=>{
        dispatcher(CalendarActions.setDays,days);
      });
  }



  useEffect(() => {
    getStore("calendar")
    .then((calendar) => {
      console.log("useEffect ... getting the stored state of calendar");
      dispatcher(CalendarActions.loadState,calendar);
    })
  }, []);
  return {
    days: state.days,
    setDays
  }
}