import React from 'react'

export const Form = ({ addItem, setNewTask, newTask, tags }) => {

    const handleInputChange = (e) => {
        setNewTask(newTask => {
            return {
                ...newTask,
                description: e.target.value
            }
        });
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
        <form className='custom-form' onSubmit={addItem}>
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
    )
}
