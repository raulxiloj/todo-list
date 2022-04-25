import React from 'react'

export const Item = ({ id, text }) => {

    const updateItem = (event, id) => {
        console.log(event, id)
    }

    return (
        <tr key={id}>
            <td></td>
            <td>
                <form>
                    <input className="form-control" autoComplete="off" value={text} onChange={(event) => updateItem(event, id)} />
                </form>
            </td>
            <td>
                <span className="badge bg-success">Success</span>
            </td>
            <td>
                <button className='btn btn-warning'>
                    <i className="bi bi-pencil"></i>
                </button>
            </td>
            <td>
                <button className='btn btn-danger'>
                    <i className="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    );
}
