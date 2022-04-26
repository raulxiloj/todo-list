import React from 'react'

export const Item = ({ task, updateItemDesc, patchTask, deleteTask }) => {

    const changeStatus = (task) => {
        task.status = !task.status;
        patchTask(null, task)
    }

    return (
        <tr key={task.id} className='d-flex'>
            <td className='col-6'>
                <form onSubmit={(e) => patchTask(e, task)}>
                    <input className="form-control" autoComplete="off" value={task.description} onChange={(event) => updateItemDesc(event, task.id)}  />
                </form>
            </td>
            <td className='col-2 text-center'>
                {
                    task.status ? 
                    <span className="badge bg-success">Done</span>
                    : <span className="badge bg-warning">Pending</span>
                }
            </td>
            {/* <td>
                <button className='btn btn-warning'>
                    <i className="bi bi-pencil"></i>
                </button>
            </td> */}
            <td className='col-2 text-center'>
                <button className='btn btn-success' onClick={() => changeStatus(task)}>
                    <i className="bi bi-check"></i>
                </button>
            </td>
            <td className='col-2 text-center'>
                <button className='btn btn-danger' onClick={() => deleteTask(task)}>
                    <i className="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    );
}
