import React from 'react';
import "./navbar.css";

const Navbar = () => {
    return (
        <div>
            <div className="navbar-container">
                <ul className="nav-ul">
                    <li className="nav-li"><a href="/">Home</a></li>
                    <li className="nav-li"><a href="/practiceset">Practice</a></li>
                    {/* <li className="nav-li"><a href="/quizset">Quiz Set</a></li> */}
                    <li className="nav-li"><a href="/quizsets">Quiz</a></li>
                    <li className="nav-login-li"><a href="/login">Login</a></li>

                </ul>
            </div>
        </div>
    )
}

export default Navbar
