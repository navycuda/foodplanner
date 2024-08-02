import React, { useState } from 'react';

import Input from '../common/Input';








export default function Recipes(props) {
  const [ ingredients, setIngredients ] = useState([
    getIngredient()
  ]);

  function getIngredient(index:number = 0){
    const key = `ingredient_${index}`;
    const qtyKey = `${key}_qty`;
    const removeIngredient = () => {
      setIngredients(ingredients.filter((_,i)=>i!==index));
    }
    return (
      <div key={key}>
        <select name={key}>
        </select>
        <Input id={qtyKey} name='Qty?' type='number'/>
        <div
          onClick={removeIngredient}
        >del</div>
      </div>
    )
  }

  const addIngredient = () => {
    setIngredients([...ingredients, getIngredient(ingredients.length)])
  }

  const handleOnSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit called");
  }


  const handleAddIngredient = (e:MouseEventHandler<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addIngredient();
  }



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