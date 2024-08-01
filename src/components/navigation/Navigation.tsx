import React from 'react';

import "./Navigation.css";




export interface NavigationItem {
  name: string;
  onClick: ()=>void;
}

export interface NavigationProps {
  navigationItems: NavigationItem[];
}




export default function Navigation(props:NavigationProps) {


  const navigationItems = props.navigationItems.map((navItem) => {
    return (
      <div 
        className='nav_item'
        key={navItem.name}
        onClick={navItem.onClick}
      >
        {navItem.name}
      </div>
    );
  })


  return (
    <div className='navigation'>
      {navigationItems}
    </div>
  );
};