import React, { useEffect, useState } from 'react';
import "./usercheck.css"
import Navbar from '../../Navbar/Navbar';
import { DataNavigation } from 'react-data-navigation';
import { useNavigate } from 'react-router';
import firebaseDB from '../../../firebase';

const UserCheck = () => {

    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState("");
    const [userID, setUSerID] = useState("")

    const getDetails=(e)=>{
        let { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        })
    }

    useEffect(() => {
        firebaseDB.child(`Quiz Folder`).child("Quiz_ID").on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setUSerID({
                    ...snapshot.val()
                })
            }
        })
    }, [])
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');

    const print=(e)=>{
        e.preventDefault()
        // console.log(userDetails.name)
        // console.log(userDetails.email)
        // console.log(userDetails.ID)
        DataNavigation.setData('user_name', userDetails.name);
        DataNavigation.setData('user_email', userDetails.email);
        DataNavigation.setData('user_ID', userDetails.ID);

            firebaseDB.child(`Quiz Folder`).child(`Quiz Results`).child(`${DataNavigation.getData('name')}_Result-${dd}-${mm}`).child(`${userDetails.name}`).push(userDetails, (err) => {
                if (err) {
                    console.log(err);
                }
            })

            console.log(dd+"/"+mm)



        {Object.keys(userID).map((id, index)=>{
            // console.log(userID[id])
            if(DataNavigation.getData('user_ID')===userID[id]){
                navigate(`quizpage`)
            }
            else if(DataNavigation.getData('user_ID')!=userID[id]){
                // alert("This not the Correct ID, Use Correct ID")
            }
        })}
        
        
    }
    return (
        <div>
            <Navbar />
            <div className="admin-login-body">
                <div className="login-input-container">
                    <form className="login-form">
                        <input className="input-login" name="name" type="text" placeholder="Enter Full Name" onChange={getDetails}  />
                        <input className="input-login" name="email" type="email" placeholder="Enter Email" onChange={getDetails} />
                        <input className="input-login" name="ID" type="text" placeholder="Enter Unique Test ID" onChange={getDetails} />
                        <input className="input-login input-btn" type="submit" onClick={print} value="Go On" />

                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserCheck
