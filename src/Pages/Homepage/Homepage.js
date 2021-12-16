import React from "react";
import Todolist from "../../Components/Todolist/Todolist";

const Homepage = () => {
    return (
        <>
        <div className="logo">
            <h2><span className="title">Todo</span>List</h2>
        </div>
        <Todolist />
        </>
    )
}

export default Homepage;