import React from "react";
import { Link } from "react-router-dom";
import './Navbar.scss'

const Navbar = ({user, setUser}) => {

    const handleClick = () => {
        setUser(null)
    }

    return (
        <div className="nav">
            <div className="logo">
                <h2><span className="title">Todo</span>List</h2>
            </div>
            {user 
            ? <Link to='/signin'>
            <div onClick={handleClick} className="signout"><i className="fas fa-power-off"></i>Sign out</div>
            </Link>
            
            : <div></div> 
            }
            
        </div>
    )
}

export default Navbar;