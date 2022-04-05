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


    var x = 0;
    var y = 0;

    function getValue(e) {
        e.preventDefault();
        DataNavigation.setData('quiz_name', quizName);

        firebaseDB.child(`Quiz Folder`).child(`Quiz names`).push(localStorage.getItem('Quiz_Name'), (err) => {
            if (err) {
                console.log(err);
            }
        })

        firebaseDB.child(`Quiz Folder`).child(`Quiz names-2`).child(`${localStorage.getItem('Quiz_Name')}`).set({ QuizName: `${localStorage.getItem('Quiz_Name')}`, Time: `${DataNavigation.getData('time')}` }, (err) => {
            if (err) {
                console.log(err);
            }
        })
        setQuizName({
            name_value: "",

        })
        navigate("addquizquestion")
    }

    const handelInputChange = (e) => {

        setQuizName(e.target.value)
        localStorage.setItem('Quiz_Name', e.target.value)
    }

    const handelInputChange_time = (e) => {
        DataNavigation.setData('time', e.target.value)
    }
    const uniqueIDChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        DataNavigation.setData('quiz_unique_id', e.target.value)
    }

    return (
        <>
            {localStorage.getItem('Admin_Name') !== "" ? null : navigate("/error")}
            <NavbarAdmin />
            <div>

                <h1 className="header-set">Add Quiz Sets</h1>
                <div className="admin-login-body add-set-container">
                    <div className="login-input-container">
                        <form className="login-form">
                            <input type="text" placeholder="Enter the Name of Quiz Set" value={name_value} onChange={handelInputChange} name="name_value" className="input-login" />
                            {/* <input  type="text" placeholder="Enter the time in minutes Eg: 30" value={name_value}  onChange={handelInputChange_time} name="name_value" className="input-login"  /> */}
                            {/* <input  type="text" placeholder="Give a unique ID to your Quiz" value={unique_id}  onChange={uniqueIDChange} name="unique_id" className="input-login"  /> */}

                            <button onClick={getValue} className="input-login input-btn" type="submit">Add</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddQuiz
