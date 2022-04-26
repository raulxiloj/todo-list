import React, { useEffect, useState } from 'react'
import { Item } from './Item'
import { deleteRequest, getRequest, patchRequest, postRequest } from '../api'
import { getInitialState } from '../helpers/task'
import { Form } from './Form'

export const ItemList = () => {

  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTask, setNewTask] = useState(getInitialState(null));

  const getTags = async () => {
    const res = await getRequest('tags')
      setTags(res.data);
      setNewTask(newTask => {
        return {
          ...newTask,
          tags: [res.data[0].id] 
        }
      }); 
  }

  const getTasks = async () => {
    const res = await getRequest('tasks')
    setTasks(res.data);
  }

  useEffect(() => {
    getTags()
  }, []);
  
  useEffect(() => {
    getTasks();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if(newTask.description.trim().length > 0)  {
      await postRequest('tasks/', newTask);
      setNewTask(getInitialState(newTask.tags));
      getTasks();
    }
  }

  const updateItemDesc = (e, id) => {
    const copyTasks = [...tasks];
    const actual = copyTasks.find(task => task.id === id);
    actual.description = e.target.value;
    setTasks(copyTasks);
  }

  const patchTask = async (e, task) => {
    if (e) {
      e.preventDefault();
    }
    await patchRequest(`tasks/${task.id}/`, {
      description: task.description,
      status: task.status
    });
    getTasks();
  }

  const deleteTask = async (task) => {
    await deleteRequest(`tasks/${task.id}`);
    getTasks();
  }

  const createTasks = (task) => {
    return <Item  task={task} key={task.id}  updateItemDesc={updateItemDesc} patchTask={patchTask} deleteTask={deleteTask} />
  }

  return (
    <>
    <Form addItem={addItem} setNewTask={setNewTask} newTask={newTask} tags={tags} />       

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
