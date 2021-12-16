import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import Button from "../Button/Button";
import Input from "../Input/Input";

const Todolist = () => {

    const getItems = () => {
        const item = localStorage.getItem('lists')
        if(item) {
            return JSON.parse(localStorage.getItem('lists'))
        } else {
            return []
        }
    }

    const [todo, setTodo] = useState('');
    const [list, setList] = useState(getItems());
    const [toggle, setToggle] = useState(true);
    const [editItem, setEditItem] = useState(null)

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(list))
    }, [list])

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

    return (
        <>
        <form autoComplete="off" onSubmit={handleSubmit} className="inputDiv">
    	   <Input autoComplete="off" type="text" name='name' value={todo} onChange={(e) => setTodo(e.target.value)} className="input " placeholder="Add the Task to the List . . ." />
           {toggle ? <Button className='add' value='ADD' /> 
                   : <Button className='edit' value={<i className="far fa-edit"></i>}/>
           }  
        </form>
        <div className="todoList">
            {list.map((item) => 
                (
                    <div className="item" key={item.id}>
                        <Input className="todo" value={item.task} disabled/>
                        <Button className='edit shadow-4-l' onClick={() => editFunction(item.id)} value={<i className="far fa-edit"></i>} />
                        <Button className='delete shadow-4-l' onClick={() => deleteFunction(item.id)} value={<i className="far fa-trash-alt"></i>} />
                    </div>
                )
            )}
        </div>
        </>  
    )
}

export default Todolist;