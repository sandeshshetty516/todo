import React from "react";
import Todolist from "../../Components/Todolist/Todolist";
import './Homepage.scss'

const Homepage = ({name, uId}) => {
    return (
        <>
        <div className="name">Hi {name}</div>
        <Todolist uId={uId} />
        </>
    )
}

export default Homepage;