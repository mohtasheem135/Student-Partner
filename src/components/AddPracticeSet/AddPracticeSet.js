import React, { useEffect, useState } from 'react';
import NavbarAdmin from '../Navbar/NavbarAdmin';
import "./addpracticeset.css";
import firebaseDB from '../../firebase';
import { useNavigate } from 'react-router';
import { DataNavigation } from 'react-data-navigation';

const AddPracticeSet = () => {

    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [data, setData] = useState("")
    const [topicName, setTopicName] = useState("")

    const values = {
        set:'',
        topic:''
    }

    const [initialState, setInitialState] = useState("");
    const { set, topic } = initialState;

var x=0;
var y=0;
        
        
    
    

    const handelSubmit = (e) => {
        e.preventDefault()
     
        {Object.keys(data).map((id, index)=>{
            if(data[id]!==initialState.set){
                console.log("Set is NOT present")
                // alert("Set already exist")
            } else {
                console.log("Set is already present ")
                x=1;
            }
        })}
        if(x===0){
            console.log(" Added to the set")
            firebaseDB.child(`Practice Set Folder`).child(`Practice Sets Name`).push(initialState.set, (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }

        {Object.keys(topicName).map((id1, index1)=>{
            if(topicName[id1]!=initialState.topic){
                console.log("topic is not Present")
            } else {
                console.log("Topic is alredy present");
                y=1;
            }
            
        })}
        if(y===0){
            console.log("Added to the Topic")
            firebaseDB.child(`Practice Set Folder`).child(`Practice set Topics`).child(`${initialState.set}_topic`).push(initialState.topic, (err)=>{
                if (err){
                    console.log(err);
                }
            })
        }
        

        setInitialState({
            set:"",
            topic:""
        })
        navigate("addpracticequestion");
        
        // console.log(initialState.set)
        // console.log(initialState.topic)
        DataNavigation.setData('practice_question_set', initialState.set); 
        DataNavigation.setData('practice_question_topic', initialState.topic); 
    }

    const handelInputChange = (e) => {
        let { name, value } = e.target;
        setInitialState({
            ...initialState,
            [name]: value,
        })
        console.log(initialState)

        firebaseDB.child(`topic`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setTopicName({
                    ...snapshot.val()
                })
            }
        })

        // {Object.keys(topicName).map((id, index)=>{
        //     console.log("Topic"+topic[id])
        // })}

        firebaseDB.child(`Practice Set Folder`).child(`Practice Sets Name`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            }
            
        })
    }


    return (
        <div>
            <NavbarAdmin />
            <p className="header-set ">Add Practice Sets Here</p>
            <div className="admin-login-body add-set-container">
                <div className="login-input-container">
                    <form className="login-form">
                        <input className="input-login" value={set} name="set" type="text" placeholder="Enter the Name of Practice Set" onChange={handelInputChange} />
                        <input className="input-login" value={topic} name="topic" type="text" placeholder="Enter the Topic" onChange={handelInputChange} />
                        <input onClick={handelSubmit}  className="input-login input-btn" type="submit" value="Submit" />
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPracticeSet
