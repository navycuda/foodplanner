import { useEffect, useReducer } from "react";
import { getItem, getStore, putData } from "../IndexedDB";
import { AppState, AppView, InitialAppState, InitialState } from "../InitialState";
import { AppActions } from "../StateActions";




export interface ReducerAction{
  type: string
}

const reducer = (state:InitialAppState,action:{type:AppActions,payload:unknown}) => {
  const { type, payload } = action;
  
  switch (type){
    case AppActions.setView:{
      const _state = {...state};
      _state.view = payload as AppView;
      console.log('app.app_setView', payload);
      return _state;
    }
    case AppActions.loadState:{
      console.log('app.loadState', payload);
      return {...state, ...payload as object}
    }
  }


  return state;
}


let firstPass = true;
export const useApp = ():AppState => {
  console.log('useApp called');
  const [ state, dispatch ] = useReducer(reducer,InitialState.app);
  const dispatcher = (type:AppActions, payload:unknown) => {
    dispatch({type,payload});
  }


  const setView = (appView:AppView) => {
    putData("app",appView,'view')
      .then(() => {
        dispatcher(AppActions.setView,appView);
      })
  }



  useEffect(() => {
    if(firstPass){
      getStore("app")
      .then((app) => {
        console.log("useEffect ... getting the stored state");
        dispatcher(AppActions.loadState,app);
        firstPass = false;
      })
    }
  }, []);


  return {
    view: state.view,
    setView
  };
};