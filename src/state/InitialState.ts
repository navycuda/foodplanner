export enum AppView{
  Calendar = "Calendar",
  Recipes = "Recipes",
  Inventory = "Inventory",
  ShoppingList = "ShoppingList"
}
export interface AppState{
  view: AppView;
  setView: (appView:AppView)=>void;
}
export interface InitialAppState{
  view: AppView;
}


export interface CalendarState{
  days: number;
  setDays: (days:number)=>void;
}
export interface InitialCalendarState{
  days: number;
}


export interface InventoryState{
  data: InventoryItem[];
  addItem: (e:React.FormEvent<HTMLFormElement>)=>void;
}
export interface InitialInventoryState{
  data: InventoryItem[];
}
export interface InventoryItem{
  name:string;
  qty:number;
  unit: 'g';
  supplier: {
    name:string;
    location:string;
  }
  min: number;
  max: number;
}
export interface StoredInventoryItem extends InventoryItem{
  id: number;
}


export interface InitialState{
  app: InitialAppState;
  calendar: InitialCalendarState;
  inventory: InitialInventoryState;
  inventory_data: InventoryItem[];
}
export const InitialStateKeys:{[state:string]:{keyPath:string,autoIncrement:boolean}} = {
  inventory_data: {
    keyPath: "id",
    autoIncrement: true
  }
}
export const InitialState:InitialState = {
  app: {
    view: AppView.Calendar
  },
  calendar: {
    days: 14
  },
  inventory: {
    data: []
  },
  inventory_data: []
}


export const dbVersion = 1;
export const idbStores = {
  app: 'app',
  calendar: 'calendar',
  inventory: 'inventory',
  inventory_data: 'inventory_data'
}