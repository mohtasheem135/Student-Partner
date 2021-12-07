import React from 'react';
import { useState } from 'react/cjs/react.development';
import "./addquiz.css";
import firebaseDB from '../../../firebase';
import { DataNavigation } from 'react-data-navigation';
import { useNavigate } from 'react-router';
import NavbarAdmin from '../../Navbar/NavbarAdmin';

const AddQuiz = () => {

    const navigate = useNavigate();
    const [uniqueID, setUniqueID] = useState("");
    const [quizName, setQuizName] = useState("");
    const { name_value } = quizName;
    const { unique_id } = uniqueID;
    const [data, setData] = useState("");
    const [userID, setUSerID] = useState("")


    var x=0;
    var y=0;

    function getValue(e){
        e.preventDefault();
        DataNavigation.setData('quiz_name', quizName);
        
        {Object.keys(data).map((id, index)=>{
            if(data[id]!==quizName){
                console.log("Set is NOT present")
            } else {
                console.log("Set is already present ")
                x=1;
            }
        })}
        if(x===0){
            console.log(" Added to the set")
            firebaseDB.child(`Quiz Folder`).child(`Quiz names`).push(quizName, (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }

        {Object.keys(userID).map((id1, index1)=>{
            if(userID[id1]!==DataNavigation.getData('quiz_unique_id')){
                console.log("Set is NOT present")
            } else {
                console.log("Set is already present ")
                alert("This ID has been used please add a different ID")
                window.location.reload();
                y=1;
            }
        })}
        if(y===0){
            console.log(" Added to the set")
            firebaseDB.child(`Quiz Folder`).child(`Quiz_ID`).push(DataNavigation.getData('quiz_unique_id'), (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }

        

        setQuizName({
            name_value: "",
            
        })
        navigate("addquizquestion")
    }

    const handelInputChange = (e)=>{
        setQuizName(e.target.value)

        firebaseDB.child(`Quiz Folder`).child("Quiz names").on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            } 
        })
        // {Object.keys(data).map((id, index)=>{
        //     console.log("Data"+data[id])
        // })}
        firebaseDB.child(`Quiz Folder`).child("Quiz_ID").on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setUSerID({
                    ...snapshot.val()
                })
            } 
        })

    }
    const uniqueIDChange = (e)=>{
        e.preventDefault()
        console.log(e.target.value)
        DataNavigation.setData('quiz_unique_id', e.target.value)
    }
    

    return (

        <div>
            <NavbarAdmin />
            <h1 className="header-set">Add Quiz Sets</h1>
            <div className="admin-login-body add-set-container">
                <div className="login-input-container">
                    <form className="login-form">
                        <input  type="text" placeholder="Enter the Name of Quiz Set" value={name_value}  onChange={handelInputChange} name="name_value" className="input-login"  />
                        <input  type="text" placeholder="Give a unique ID to your Quiz" value={unique_id}  onChange={uniqueIDChange} name="unique_id" className="input-login"  />

                        <input onClick={getValue} className="input-login input-btn" type="submit" value="Add" />
                        
                    </form>
                </div>
            </div>
        </div>
    )
    }

export default AddQuiz
