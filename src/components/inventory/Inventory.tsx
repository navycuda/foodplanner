import React from 'react';
import { useInventory } from '../../state/uses/useInventory';
import { putData } from '../../state/IndexedDB';

export default function Inventory(props) {
  const inventory = useInventory();
  
  console.log(inventory);


  const inventoryItems = inventory.data.map((item, itemIndex) => {
    const key = `${item.name}_${itemIndex}`;
    const { name, qty, unit } = item;
    return (
      <li key={key}>
        <div>{name}</div>
        <div>{qty} {unit}</div>
      </li>
    )
  })


  return (
    <div>
      <div>
        <h3>Add New Or Edit Inventory Item</h3>
        <form
          onSubmit={inventory.addItem}
        >

          <div>
            <label htmlFor="name">name:</label>
            <input type='text' name='name'/>
          </div>
          <div>
            <label htmlFor="qty">qty:</label>
            <input type='number' name='qty'/>
          </div>
          <div>
            <label htmlFor="unit">unit:</label>
            <select name='unit'>
              <option value="g">g</option>
            </select>
          </div>
          <div>
            <label htmlFor="min">min:</label>
            <input type='number' name='min'/>
          </div>
          <div>
            <label htmlFor="max">max:</label>
            <input type='number' name='max'/>
          </div>
          <div>
            <h4>Supplier</h4>
            <div>
              <label htmlFor="supplier">supplier:</label>
              <input type='text' name='supplier'/>
            </div>
            <div>
              <label htmlFor="location">location:</label>
              <input type='text' name='location'/>
            </div>
          </div>
          <input type='submit'/>
        </form>  
      </div>      
      
      <div>
        <h3>Inventory Items</h3>
        <ul>
          {inventoryItems}  
        </ul>
      </div>      
    </div>
  );
}