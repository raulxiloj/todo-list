import React, { useEffect, useState } from 'react';
import { Item } from './Item';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../api';
import { getInitialState } from '../helpers/task';
import { Form } from './Form';
import Swal from 'sweetalert2';

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
    if (newTask.description.trim().length > 0) {
      Swal.fire('Creating');
      Swal.showLoading();
      postRequest('tasks/', newTask).then(res => {
        Swal.close();
        setNewTask(getInitialState(newTask.tags));
        getTasks();
        Swal.fire('Success', 'Task added correctly', 'success');
      });
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
    Swal.fire('Deleting');
    Swal.showLoading();
    deleteRequest(`tasks/${task.id}`)
      .then(res => {
        console.log(res);
        Swal.close();
        getTasks();
      });
  }

  const createTasks = (task) => {
    return <Item task={task} key={task.id} updateItemDesc={updateItemDesc} patchTask={patchTask} deleteTask={deleteTask} />
  }

  return (
    <>
      <Form tasks={tasks} setTasks={setTasks} addItem={addItem} setNewTask={setNewTask} newTask={newTask} tags={tags} />

      <div className='container'>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
          <table className='table table-stripped mt-3 text-light'>
          <thead>
            <tr className='d-flex'>
              <th className='col-6'>Description</th>
              <th className='col-2 text-center'>Status</th>
              {/* <th>Edit</th> */}
              <th className='col-2 text-center'>Done</th>
              <th className='col-2 text-center'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              tasks.map(createTasks)
            }
          </tbody>
        </table>
          </div>
        </div>
        
      </div>
    </>
  );
}
