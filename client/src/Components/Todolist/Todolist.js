import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import Button from "../Button/Button";
import Input from "../Input/Input";

const Todolist = ({uId}) => {

    const [todo, setTodo] = useState('');
    const [list, setList] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [editItem, setEditItem] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3001/todo/${uId}`, {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(todos => {
            if(todos) {
                setList(todos)
            } else {
                setList([])
            }
        })
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if(todo && toggle) {
            fetch('http://localhost:3001/todo', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: uId,
                    id: uuid(),
                    task: todo
                })
            })
            setTodo('');
        } else if(todo && !toggle) {
            fetch(`http://localhost:3001/todo/${editItem}`, {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    task: todo
                })
            })
            setTodo('')
            setToggle(true)
        }
    }

    const deleteFunction = (id) => {
        fetch(`http://localhost:3001/todo/${id}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}
        })
    }

    const editFunction = (id) => {
        let newItem = list.find((item) => item.task_id === id)
        setToggle(false)
        setTodo(newItem.task)
        setEditItem(id)
    }

    return (
        <>
        <form autoComplete="off" onSubmit={handleSubmit} className="inputDiv">
    	   <Input autoComplete="off" type="text" name='name' value={todo} onChange={(e) => setTodo(e.target.value)} className="input" placeholder="Add the Task to the List . . ." />
           {toggle ? <Button className='add' value='ADD' /> 
            : <Button className='edit' value={<i className="far fa-edit"></i>}/>
           }  
        </form>
        <div className="todoList">
            {list.map((item) => 
                (
                    <div className="item" key={item.task_id}>
                        <Input className="todo" value={item.task} disabled/>
                        <Button className='edit shadow-4-l' 
                        onClick={() => editFunction(item.task_id)} 
                        value={<i className="far fa-edit"></i>} />
                        <Button className='delete shadow-4-l' 
                        onClick={() => deleteFunction(item.task_id)}
                         value={<i className="far fa-trash-alt"></i>} />
                    </div>
                )
            )}
        </div>
        </>  
    )
}

export default Todolist;