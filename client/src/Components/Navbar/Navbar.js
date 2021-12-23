import React from "react";
import './Navbar.scss'

const Navbar = ({onRouteChange, signIn}) => {
    return (
        <div className="nav">
            <div className="logo">
                <h2><span className="title">Todo</span>List</h2>
            </div>
            {signIn 
            ? <div onClick={() => onRouteChange('signout')} className="signout"><i className="fas fa-power-off"></i>Sign out</div>
            : <div></div> 
            }
            
        </div>
    )
}

export default Navbar;