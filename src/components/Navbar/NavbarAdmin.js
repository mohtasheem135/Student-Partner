import React from 'react';
import "./navbar.css";

const NavbarAdmin = () => {
    return (
        <div>
            <div className="navbar-container">
                <ul className="nav-ul">
                    
                    <li className="nav-li"><a href="/addpracticeset">Add Practice Set</a></li>
                    <li className="nav-li"><a href="/addquiz">Add Quiz</a></li>
                    <li className="nav-li nav-logout nav-login-li"><a href="/">Log out</a></li>
                    
                    
                </ul>
            </div>
        </div>
    )
}

export default NavbarAdmin
