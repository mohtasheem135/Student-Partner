import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react/cjs/react.development';
import firebaseDB from '../../../firebase';
import "./quizpage.css"
import { DataNavigation } from 'react-data-navigation';
import Navbar from '../../Navbar/Navbar';
import 'font-awesome/css/font-awesome.min.css';
import { useTimer } from 'react-timer-hook';

import Countdown from 'react-countdown';

const QuizShop = () => {
    const navigate = useNavigate();

    const generateUniqueId = require('generate-unique-id');

    const [dataValue, setDataValue] = useState({});
    const [quizName, setQuizName] = useState("");
    const [timeData, setTimeData] = useState("");


    useEffect(() => {
        setQuizName(DataNavigation.getData('name'))
        // console.log(DataNavigation.getData('name'));
        //  console.log(quizName)

        console.log("jwndsnc" + localStorage.getItem('Quiz_Name'))



        firebaseDB.child(`Quiz Folder`).child(`Quiz Questions`).child(`${DataNavigation.getData('name')}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setDataValue({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })

        firebaseDB.child(`Quiz Folder`).child(`Quiz names-2`).child(`${DataNavigation.getData('name')}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setTimeData({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })


    }, [])
    console.log(timeData.Time)
    console.log(Object.keys(dataValue).length)
    DataNavigation.setData('total_question', Object.keys(dataValue).length);

    var m = timeData.Time * 60
    const time = new Date();

    time.setSeconds(300)

    // function MyTimer({ expiryTimestamp }) {
    //     const {
    //         seconds,
    //         minutes,
    //         hours,
    //         days,
    //         isRunning,
    //         start,
    //         pause,
    //         resume,
    //         restart,
    //     }
    //     = useTimer({
    //         expiryTimestamp, onExpire: () =>{
    //             alert("Stop Now !!!!");
    //             // DataNavigation.setData('name', "");
    //             navigate('/score');

    //         }
    //     });

    //     return(
    //         <div className='timer'>
    //             <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>

    //         </div>

    //     )
    // }





    const [selectedNumber, setSelectedNumber] = useState(0);
    const [num, setNum] = useState(0);
    const [attempt, setAttempt] = useState(0);
    const [user, setUser] = useState("")

    DataNavigation.setData('user_answer_id', user)

    const selectNumber = numberSelected => {

        setSelectedNumber(numberSelected.target.value);
        Object.keys(dataValue).map((id) => {

            if (numberSelected.target.value === dataValue[id].answer) {
                var i = num + 1;
                setNum(i)
            }
        })

        // console.log(numberSelected.target.value)
        numberSelected.target.style.backgroundColor = "#66a3ff"
    }

    function finalScore() {
        console.log(num);
        // x = x + 1;
        DataNavigation.setData('score', num);
        // DataNavigation.setData('attempt', attempt);
        DataNavigation.setData('name', "");
        navigate("/score")

        firebaseDB.child(`Quiz Folder`).child(`Quiz Results`).child(`${localStorage.getItem('quizName')}`).child(`${DataNavigation.getData('user_name')}`).set({ name: `${DataNavigation.getData('user_name')}`, email: `${DataNavigation.getData('user_email')}`, score: `${num}` }, (err) => {
            if (err) {
                console.log(err);
            }
        })

    }
    // function get() {
    //     setUser(generateUniqueId())

    // }


    return (
        <div>
            <h2 className="header-1 sticky-header">{quizName}</h2>
            <hr />

            {/* <MyTimer expiryTimestamp={time} /> */}
            <button className="quiz-submit-btn-top" onClick={finalScore}>submit<i class="fas fa-chevron-circle-right"></i></button>

            {Object.keys(dataValue).map((id, index) => {
                return (
                    <>
                        <div className="quiz-quen-container">
                            <h3 className="quiz-quen">{index + 1 + ") "}{dataValue[id].option_x}</h3>
                            <div className="quiz-option-container">
                                {/* {setAnswer(dataValue[id].answer)} */}
                                <button onClick={selectNumber} className="quiz-option-btn" value={dataValue[id].option_a}>A) {dataValue[id].option_a}</button>
                                <button onClick={selectNumber} className="quiz-option-btn" value={dataValue[id].option_b}>B) {dataValue[id].option_b}</button>
                                <button onClick={selectNumber} className="quiz-option-btn" value={dataValue[id].option_c}>C) {dataValue[id].option_c}</button>
                                <button onClick={selectNumber} className="quiz-option-btn" value={dataValue[id].option_d}>D) {dataValue[id].option_d}</button>
                            </div>
                            <hr />

                        </div>

                    </>

                )
            })}
            <hr />
            {/* <button onClick={get}>GET</button> */}
            <button className="quiz-submit-btn" onClick={finalScore}>submit<i class="fas fa-chevron-circle-right"></i></button>
            {/* <h1>{score}</h1> */}
        </div>
    )
}

export default QuizShop
