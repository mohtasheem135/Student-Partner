import React from 'react';
import "./navbar.css";
import { useNavigate } from 'react-router';

const NavbarAdmin = () => {

    const navigate = useNavigate();

    const logOut=()=> {
        localStorage.setItem('Admin_Name', "");
        navigate('/')
    }

    return (
        <div>
            <div className="navbar-container">
                <ul className="nav-ul">
                    
                    <li className="nav-li"><a href="/addpracticeset">Add Practice Set</a></li>
                    <li className="nav-li"><a href="/addquiz">Add Quiz</a></li>
                    <li className="nav-li"><a href="/rank">Rank</a></li>
                    <li  className="nav-li nav-logout nav-login-li"><a onClick={logOut}>Log out</a></li>
                    
                    
                </ul>
            </div>
        </div>
    )
}

export default NavbarAdmin
