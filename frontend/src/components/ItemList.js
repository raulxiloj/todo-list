import React, { useState } from 'react'
import { Item } from './Item'

export const ItemList = () => {

  const [items, setItems] = useState([{text: 'jeje testing', key:1}])

  const addItem = (e) => {

  }

  const createTasks = (item) => {
    return <Item text={item.text} key={item.key} />
  }

  return (
    <>
      <form className='custom-form'  onSubmit={addItem}>
        <input className='custom' placeholder='Add a new item' autoFocus />
        <button className='custom' onClick={addItem}><i className="bi bi-plus-square-fill"></i></button> 
      </form>
      <div className='container'>
        <table className='table table-stripped mt-3 text-light'>
          <thead>
            <tr>
              <th></th>
              <th>Description</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map(createTasks)
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
