import { useEffect, useReducer } from "react"
import { getStore, putData } from "../IndexedDB";
import { CalendarActions, InventoryActions } from "../StateActions";
import {  InitialInventoryState, InitialState, InventoryState } from "../InitialState";



const reducer = (state:InitialInventoryState,action:{type:InventoryActions,payload:unknown}) => {
  const { type, payload } = action;

  switch (type){
    case InventoryActions.loadState:{
      return {...state, ...payload as object};
    }
  }

  return state;
}


export const useInventory = ():InventoryState => {
  const [ state, dispatch ] = useReducer(reducer,{ ...InitialState.inventory, data: InitialState.inventory_data });
  const dispatcher = (type:InventoryActions, payload:unknown) => {
    dispatch({type,payload});
  }





  const addItem = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inventoryItem:{[key:string]:unknown} = {};
    formData.forEach((value,key) => {
      inventoryItem[key] = value; 
    })
    putData('inventory_data',inventoryItem)
      .then(() => {
        getStore("inventory_data")
        .then((inventory_data) => {
          dispatcher(InventoryActions.loadState,{...state, data: Object.values(inventory_data as object)});
        })
      })
  }





  useEffect(() => {
    getStore("inventory")
    .then((inventory) => {
      console.log("useEffect ... getting the stored state of inventory", inventory);
      getStore("inventory_data")
        .then((inventory_data) => {
          console.log("useEffect ... getStore.getStore!", {inventory, inventory_data});
          dispatcher(InventoryActions.loadState,{...inventory as object, data: Object.values(inventory_data)});
        })
    })
  }, []);
  return {
    data: state.data,
    addItem
  }
}