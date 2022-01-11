import React from "react";
import Todolist from "../../Components/Todolist/Todolist";
import './Homepage.scss'

const Homepage = ({user}) => {
    return (
        <>
            <div className="name">Hi {user.name}</div>
            <Todolist uId={user.user_id} />
        </>
    )
}

export default Homepage;