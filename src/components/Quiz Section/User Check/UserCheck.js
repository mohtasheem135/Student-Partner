import React, { useEffect, useState } from 'react';
import "./usercheck.css"
import Navbar from '../../Navbar/Navbar';
import { DataNavigation } from 'react-data-navigation';
import { useNavigate } from 'react-router';
import firebaseDB from '../../../firebase';

const UserCheck = () => {

    const navigate = useNavigate();


    const print = (e) => {
        e.preventDefault();
        navigate(`quizpage`)

        firebaseDB.child(`Quiz Folder`).child(`Quiz Results`).child(`Contestant Names`).child(`${DataNavigation.getData('name')}`).push(DataNavigation.getData('user_name'), (err) => {
            if (err) {
                console.log(err);
            }
        })

    }

    const Test_Name = (e) => {
        DataNavigation.setData('user_name', e.target.value);
    }

    const Test_Email = (e) => {
        DataNavigation.setData('user_email', e.target.value);
    }

    return (
        <div>
            <Navbar />
            <div className="admin-login-body">
                <div className="login-input-container">
                    <form className="login-form">
                        <input className="input-login" name="name" type="text" placeholder="Enter Full Name" onChange={Test_Name} />
                        <input className="input-login" name="email" type="email" placeholder="Enter Email" onChange={Test_Email} />
                        {/* <input className="input-login" name="ID" type="text" placeholder="Enter Unique Test ID" onChange={getDetails} /> */}
                        <input className="input-login input-btn" type="submit" onClick={print} value="Go On" />

                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserCheck
