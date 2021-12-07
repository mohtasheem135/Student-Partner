import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import "./adminregistration.css"
import { useNavigate } from 'react-router';
import firebaseDB from '../../firebase';

const AdminLogin = () => {

    const navigate = useNavigate();

    const [data, setData] = useState("");

    const values = {
        name:'',
        email: '',
        password: ''
    }
    const [initialState, setInitialState] = useState("");
    const { name, email, password } = initialState;

    const handelSubmit = (e)=>{
        e.preventDefault()
        console.log(initialState.password)
        firebaseDB.child(`Admin Folder`).child(`${initialState.name}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })
        // console.log(data)
        {Object.keys(data).map((id, index)=>{
            console.log(data[id])
            if(data[id].email==initialState.email && data[id].password==initialState.password){
                navigate("/addpracticeset")
            }
            else {
                alert("Incorrect Password or Email")
                // navigate("/")
            }
        })}
    }


    const handelInputChange = (e) => {
        let { name, value } = e.target;
        setInitialState({
            ...initialState,
            [name]: value,
        })
        // console.log(initialState.email)
    }

    


    function register(){
        navigate("/register")
    }
    return (
        <div>
            <Navbar/>
            <div className="admin-login-body">
                <div className="login-input-container">
                    <form className="login-form">
                    <input className="input-login" name="name" type="email" placeholder="Enter Name" onChange={handelInputChange} />
                    <input className="input-login" name="email" type="email" placeholder="Enter Email" onChange={handelInputChange} />
                    <input  className="input-login" name="password" type="password" placeholder="Enter Password" onChange={handelInputChange} />
                    <input onClick={handelSubmit} className="input-login input-btn" type="submit" value="LogIn (Double Click)" />
                    <input onClick={register} className="input-login input-btn" type="submit" value="Register" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
