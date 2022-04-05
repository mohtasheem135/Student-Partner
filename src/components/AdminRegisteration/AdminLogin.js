import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import "./adminregistration.css"
import { useNavigate } from 'react-router';
import firebaseDB from '../../firebase';
import { DataNavigation } from 'react-data-navigation';

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

        {Object.keys(data).map((id, index)=>{
            console.log(data[id])
            if(data[id].email==DataNavigation.getData('Login_Email') && data[id].password==DataNavigation.getData('Login_Password')){
                navigate("/addquiz")
            }
            else {
                alert("Incorrect Password or Email")
                // navigate("/")
            }
        })}
    }


    const handelInputChange_Name = (e) => {
        
        DataNavigation.setData('Login_Name', e.target.value);
        localStorage.setItem('Admin_Name', e.target.value);

        firebaseDB.child(`Admin Folder`).child(`${e.target.value}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            } 
        })

        console.log("thisss "+e.target.value)
    }


    const handelInputChange_Email = (e) => {
        DataNavigation.setData('Login_Email', e.target.value);
    }

    const handelInputChange_Password = (e) => {
        DataNavigation.setData('Login_Password', e.target.value);
    }
    


    function register(){
        navigate("/register")
    }
    return (
        <div>
            <Navbar/>
            <h1 className="header-set">Login</h1>
            <div className="admin-login-body">
                <div className="login-input-container">
                    <form className="login-form">
                    <input className="input-login" name="name" type="email" placeholder="Enter Name" onChange={handelInputChange_Name} />
                    <input className="input-login" name="email" type="email" placeholder="Enter Email" onChange={handelInputChange_Email} />
                    <input  className="input-login" name="password" type="password" placeholder="Enter Password" onChange={handelInputChange_Password} />
                    <input onClick={handelSubmit} className="input-login input-btn" type="submit" value="LogIn" />
                    {/* <input onClick={register} className="input-login input-btn" type="submit" value="Register" /> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
