import React, { useEffect, useState } from 'react'
import { Item } from './Item'
import api from '../api'
import { getInitialState } from '../helpers/task'

export const ItemList = () => {

  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTask, setNewTask] = useState(getInitialState(null));

  useEffect(() => {
    api.get('tags')
      .then(res => {
      console.log(res.data);
      setTags(res.data);
      setNewTask(newTask => {
        return {
          ...newTask,
          tags: [res.data[0].id] 
        }
      }); 
    })
  }, []);
  
  useEffect(() => {
    api.get('tasks')
      .then(res => {
        console.log(res.data);
        setTasks(res.data);
      });
  }, []);

  const handleInputChange = (e) => {
    setNewTask(newTask => {
        return {
          ...newTask,
          description: e.target.value 
        }
    });
  }

  const addItem = (e) => {
    e.preventDefault();
    if(newTask.description.trim().length > 0)  {
      console.log(newTask);
      api.post('tasks/', newTask)
      setNewTask(getInitialState(newTask.tag));
    }
  }

  const updateItemDesc = (e, id) => {
    //console.log(e.target.value, id);
    const copyTasks = [...tasks];
    const actual = copyTasks.find(task => task.id === id);
    actual.description = e.target.value;
    setTasks(copyTasks);
  }

  const patchTask = (e, task) => {
    if (e) {
      e.preventDefault();
    }
    api.patch(`tasks/${task.id}/`, {
      description: task.description,
      status: task.status
    });
  }

  const deleteTask = (task) => {
    api.delete(`tasks/${task.id}`);
  }

  const createTasks = (task) => {
    return <Item  task={task} key={task.id}  updateItemDesc={updateItemDesc} patchTask={patchTask} deleteTask={deleteTask} />
  }

  const changeTag = (e) => {
    e.preventDefault()
    setNewTask(newTask => {
      return {
        ...newTask,
        tags: [parseInt(e.target.value)]
      }
    });
  }

  return (
    <>
      <form className='custom-form'  onSubmit={addItem}>
        <input className='custom' placeholder='Add a new item' autoFocus onChange={handleInputChange} value={newTask.description} />
        <button className='custom' onClick={addItem}><i className="bi bi-plus-square-fill"></i></button>
        <div className='select'>
          <select className='filter-todo' onChange={changeTag}>
            {
              tags.map(tag => {
                return <option key={tag.id} value={tag.id}>{tag.name}</option>
              })
            }
          </select>
        </div> 
      </form>

      <div className='container'>
        <table className='table table-stripped mt-3 text-light'>
          <thead>
            <tr>
              <th></th>
              <th>Description</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Done</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              tasks.map(createTasks)
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
