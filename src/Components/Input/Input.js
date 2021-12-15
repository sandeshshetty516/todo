import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import './Input.scss';


const Input =() => {

    const getItems = () => {
        return JSON.parse(localStorage.getItem('list'))
    }

    const [todo, setTodo] = useState('');
    const [list, setList] = useState(getItems);
    const [toggle, setToggle] = useState(true);
    const [editItem, setEditItem] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(todo && toggle) {
            const allData = { id: uuid(), task: todo }
            setList([...list, allData])
            setTodo('');
        } else if(todo && !toggle) {
            setList(
                list.map((item) => {
                    if(item.id === editItem) {
                        return{ ...item, task: todo}
                    }
                    return item;
                })
            )
            setToggle(true);
            setTodo('')
        } 
    }

    const deleteFunction = (index) => {
        list.splice(index,1)
        setList([...list])
    }

    const editFunction = (id) => {
        let newItem = list.find((item) => item.id === id)
        setToggle(false)
        setTodo(newItem.task)
        setEditItem(id)
    }

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])

    return (
        <>
        <form autoComplete="off" onSubmit={handleSubmit} className="inputDiv">
    	   <input autoComplete="off" type="text" name='name' value={todo} onChange={(e) => setTodo(e.target.value)} className="input " placeholder="Add the Task to the List . . ." />
           {toggle ? <button className="add">ADD</button>
                   : <button className="edit"><i className="far fa-edit"></i></button> 
           }
    	   
        </form>
        <div className="todoList">
            {list.map((item, index) => 
                (
                    <div className="item" key={index}>
                        {/* <div className="todo">
                            {item.task}
                        </div> */}
                        <input className="todo" value={item.task} disabled/>
                        <button className="edit shadow-4-l" onClick={() => editFunction(item.id) }><i className="far fa-edit"></i></button>
                        <button className="delete shadow-4-l" onClick={() => deleteFunction(index)}><i className= "far fa-trash-alt"></i></button>
                    </div>
                )
            )}
        </div>
        </>  
    )
}

export default Input;