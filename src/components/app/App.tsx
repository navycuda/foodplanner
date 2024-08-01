import { useState } from 'react'
import './App.css'

import Calendar from '../calendar/Calendar';
import Inventory from '../inventory/Inventory';
import Recipes from '../recipes/Recipes';
import ShoppingList from '../shoppinglist/ShoppingList';

import Navigation, { NavigationItem, NavigationProps } from '../navigation/Navigation';
import { useApp } from '../../state/uses/useApp';

export enum AppView{
  Calendar = "Calendar",
  Recipes = "Recipes",
  Inventory = "Inventory",
  ShoppingList = "ShoppingList"
}

export default function App() {
  const { view, setView } = useApp();
  
  



  const getNavigationItem = (view:AppView):NavigationItem => {
    const onClick = () => {
      setView(view);
    }
    return {
      name: view,
      onClick
    }
  }

  const navigationProps:NavigationProps = {
    navigationItems: [
      getNavigationItem(AppView.Calendar),
      getNavigationItem(AppView.Recipes),
      getNavigationItem(AppView.Inventory),
      getNavigationItem(AppView.ShoppingList)
    ]
  }






  return (
    <div>
      <h1>FoodPranner</h1>

      <Navigation {...navigationProps}/>


      { view === AppView.Calendar       && <Calendar/>      }
      { view === AppView.Recipes        && <Recipes/>       }
      { view === AppView.Inventory      && <Inventory/>     }
      { view === AppView.ShoppingList   && <ShoppingList/>  }
    </div>
  )
}
