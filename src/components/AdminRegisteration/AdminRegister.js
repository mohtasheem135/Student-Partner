import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import "./adminregistration.css";
import { useNavigate } from 'react-router';
import firebaseDB from "../../firebase"

const AdminRegister = () => {

    const navigate = useNavigate();

    const values = {
        name: '',
        email: '',
        password: ''
    }
    const [initialState, setInitialState] = useState("");
    const { name, email, password } = initialState;

    const handelSubmit = (e) => {
        e.preventDefault()
        firebaseDB.child(`Admin Folder`).child(`${initialState.name}`).push(initialState, (err) => {
            if (err) {
                console.log(err);
            }
        })
        navigate("/login");
        setInitialState({
            name: "",
            email: "",
            password: ""
        })
        // console.log(initialState.email)
    }

    const handelInputChange = (e) => {
        let { name, value } = e.target;
        setInitialState({
            ...initialState,
            [name]: value,
        })
    }


    function register() {
        navigate("/login")
    }

    return (
        <div>
            <Navbar />
            <div className="admin-login-body">
                <div className="login-input-container">
                    <form className="login-form">
                        <input className="input-login" name="name" type="text" placeholder="Enter Full Name" onChange={handelInputChange} />
                        <input className="input-login" name="email" type="email" placeholder="Enter Email" onChange={handelInputChange} />
                        <input className="input-login" name="password" type="password" placeholder="Enter Password" onChange={handelInputChange} />
                        <input onClick={handelSubmit} className="input-login input-btn" type="submit" value="Register" />
                        <input onClick={register} className="input-login input-btn" type="submit" value="LogIn" />

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminRegister
