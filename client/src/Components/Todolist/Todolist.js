import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import Button from "../Button/Button";
import Input from "../Input/Input";

const Todolist = ({uId}) => {

    const [todo, setTodo] = useState('');
    const [list, setList] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [editItem, setEditItem] = useState(null)

    const url = `http://localhost:4000/todo/${uId}`

    useEffect(() => {
        const loadData = async () => {
            const res = await fetch(url)
            const data = res.json()
            return data;
        }
    
        loadData().then((data) => setList(data))
    }, [url])

    

    const handleSubmit = (e) => {
        e.preventDefault()
        if(todo && toggle) {
            fetch('http://localhost:4000/todo', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: uId,
                    id: uuid(),
                    task: todo
                })
            })
            window.location.reload(false);
            setTodo('');
        } else if(todo && !toggle) {
            fetch(`http://localhost:4000/${uId}/todo/${editItem}`, {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    task: todo
                })
            })
            window.location.reload(false);
            setTodo('')
            setToggle(true)
        }
    }

    const deleteFunction = (id) => {
        fetch(`http://localhost:4000/${uId}/todo/${id}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}
        })
        window.location.reload(false);
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