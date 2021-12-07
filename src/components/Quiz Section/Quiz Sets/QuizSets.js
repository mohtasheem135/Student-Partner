import { render } from '@testing-library/react';
import React, { createContext, useEffect, useState } from 'react';
import "./quizsets.css";
import { useNavigate } from 'react-router';
import firebaseDB from '../../../firebase';
import { DataNavigation } from 'react-data-navigation';
import Navbar from '../../Navbar/Navbar';


const QuizSets = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [value, setValue] = useState("")

    

    useEffect(() => {
        firebaseDB.child(`Quiz Folder`).child("Quiz names").on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })
    }, [])

    console.log(data)
    
    const [selectedNumber, setSelectedNumber] = useState("");
    const selectNumber=(e) => {
        setSelectedNumber(e.target.value);
        DataNavigation.setData('name', e.target.value); 
        // navigate("quizpage")
        navigate("/usercheck")
    }
    
    return (
        <div>
            <Navbar/>
            <h2 className="header-1">All our Quizes</h2>
            <h1>{selectedNumber}</h1>
            {Object.keys(data).map((id, index) => {
                return (
                    <div className="quiz-set-container">
                        <p className="quiz-set-topic">{data[id]}<button onClick={selectNumber}  value={data[id]} className="quiz-set-btn">Practice<i class="fas fa-arrow-circle-right"></i></button></p>
                        <hr/>
                        
                    </div>
                    
                )
            })}
            {/* <div className="set-container">
                <h2></h2>
                <button className="set-btn" onClick={set_1} >See Question</button>
            </div> */}
        </div>
    )
}


export default QuizSets
