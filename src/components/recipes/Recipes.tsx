import React, { useState, useEffect } from 'react';

import Input from '../common/Input';
import { useInventory } from '../../state/uses/useInventory';








export default function Recipes(props) {
  const [ inventoryItems, setInvetoryItems ] = useState([]);


  const inventory = useInventory();


  
  console.log('inventoryItems', inventoryItems);

  console.log("Recipes", inventory);
  const _inventoryItems = inventoryItems.map((item, itemIndex) => {
    const key = `${item.name}_${itemIndex}`;
    const { id, name, qty, unit } = item;
    return (
      <option key={key} value={id}>
        {name}
      </option>
    )
  })

  console.log("_inventoryItems",_inventoryItems)

  const getIngredient = (index:number = 0) => {
    const key = `ingredient_${index}`;
    const qtyKey = `ingredientQty_${index}`;
    const removeIngredient = () => {
      setIngredients(ingredients.filter((_,i)=>i!==index));
    }
    return (
      <div key={key}>
        <select name={key}>
          {_inventoryItems}
        </select>
        <Input id={qtyKey} name='Qty?' type='number'/>
        <div
          onClick={removeIngredient}
        >del</div>
      </div>
    )
  }

  const [ ingredients, setIngredients ] = useState([]);

  const addIngredient = () => {
    setIngredients([...ingredients, getIngredient(ingredients.length)])
  }

  const handleOnSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const recipe:{[key:string]:unknown} = {
      ingredients: []
    };


    const ingredients:{[index:number]:{id:string,qty:number}} = {};

    formData.forEach((value,key) => {
      const ingredientPattern = /ingredient(?<qty>Qty)?_(?<index>\d+)/i;
      const keyMatch = key.match(ingredientPattern);
      
      if (keyMatch){
        const { qty, index } = keyMatch.groups;
        if (!ingredients[index]){
          ingredients[index] = {
            id: "",
            qty: 0
          } 
        }
        if (qty) {
          ingredients[index].qty = parseInt(value as string)
        } else {
          ingredients[index].id = value as string
        }
      } else {
        recipe[key] = value;
      }
    });
    
    recipe.ingredients = Object.values(ingredients);
    console.log("submit called",recipe);
  }


  const handleAddIngredient = (e:MouseEventHandler<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addIngredient();
  }


  useEffect(() => {
    setInvetoryItems(inventory.data);
    if (!ingredients.length){
      addIngredient();
    }
    console.log('Recipes.useEffect', inventory.data);
  }, [inventory.data])


  return (
    <div>
      <h2>Recipes</h2>
      <div>
        <h3>Add/Edit Recipe</h3>
        <form
          onSubmit={handleOnSubmit}
        >
          <Input id='name' name='Name' type='text'/>



          <div>
            <h4>Ingredients</h4>
            {ingredients}
            <button
              onClick={handleAddIngredient}
            >+</button>
          </div>


          <input type='submit'/>
        </form>
      </div>
    </div>
  );
}