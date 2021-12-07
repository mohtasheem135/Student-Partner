import React, { useEffect, useState } from 'react';
import "./score.css";
import { DataNavigation } from 'react-data-navigation';
import { useNavigate } from 'react-router';
import firebaseDB from '../../../firebase';
import 'font-awesome/css/font-awesome.min.css';

const Score = () => {
    const navigate = useNavigate();

    const [dataValue, setDataValue] = useState({});
    const [quizName, setQuizName] = useState("");
    const [userAnswer, setUserAnswer] = useState({})
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');


    useEffect(() => {
        setQuizName(DataNavigation.getData('name'))
        
        //  console.log(quizName)

        firebaseDB.child(`Quiz Folder`).child(`Quiz Score`).child(`${DataNavigation.getData('name')}_Result-${dd}-${mm}`).child(`${DataNavigation.getData('user_name')}`).child("Correct-Answers").push(DataNavigation.getData('score'), (err) => {
            if (err) {
                console.log(err);
            }
        })


        console.log(DataNavigation.getData('user_answer_id'));


        firebaseDB.child(`Quiz Folder`).child(`Quiz Questions`).child(`${DataNavigation.getData('name')}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setDataValue({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })
        // {Object.keys(dataValue).map((id, index)=>{
        //     const condition_A = dataValue[id].option_a===dataValue[id].answer;
        // })}

        // firebaseDB.child(`User_Answers`).child(`History_user_answers`).child(`user_${DataNavigation.getData('user_answer_id')}`).on("value", (snapshot) => {
        //     if (snapshot.val() != null) {
        //         setUserAnswer({
        //             ...snapshot.val()
        //         })
        //     } else {
        //         snapshot({});
        //     }
        // })
        // console.log(userAnswer)
    }, [])
    

    var a = 0;
    function jump() {
        navigate("/quizsets")
    }

    return (
        <>
        <h1 className="header-1"> {DataNavigation.getData('user_name')}'s Score Card</h1>
            <div className="score-container">
                {/* <h3 className="header-1">{DataNavigation.getData('user_answer_id')}</h3> */}
                
                <p className="score-text">Total Marks :- {DataNavigation.getData('score')}/{DataNavigation.getData('total_question')}</p>
                <p className="score-text">Correct Answers  :- {DataNavigation.getData('score')} </p>
                <p className="score-text">Wrong Answer :- {DataNavigation.getData('attempt') - DataNavigation.getData('score')}</p>
                <p className="score-text">Total Number of Questions :- {DataNavigation.getData('total_question')}</p>
                <p className="score-text">Attempted Questions   :- {DataNavigation.getData('attempt')}</p>
                <p className="score-text">Unattempted Questions   :- {DataNavigation.getData('total_question') - DataNavigation.getData('attempt')}</p>
                
               
            </div>
            <button onClick={jump} className="quiz-submit-btn"><i class="fas fa-arrow-circle-left"></i>Go to Quiz Sets</button><br/><br/><br/>
            
            <h1 className="header-1">Answer Key</h1>

            {Object.keys(dataValue).map((id, index) => {
                //    setAnswer(dataValue[id].answer)
                // {Object.keys(userAnswer).map((id1,index1)=>{
                //     const condition_A = userAnswer[id1].option_a === dataValue[id].answer;
                // })}
                const condition_A = dataValue[id].option_a === dataValue[id].answer;
                const condition_B = dataValue[id].option_b === dataValue[id].answer;
                const condition_C = dataValue[id].option_c === dataValue[id].answer;
                const condition_D = dataValue[id].option_d === dataValue[id].answer;

                return (
                    <>

                        <div className="quiz-quen-container">

                            <h3 className="quiz-quen quiz-quen-score">{index + 1 + ") "}{dataValue[id].option_x}</h3>
                            <div className="quiz-option-container-score">
                                {/* {setAnswer(dataValue[id].answer)} */}
                                <button style={{ backgroundColor: condition_A ? "#1aff1a" : "white" }} className="quiz-option-btn-score" value={dataValue[id].option_a}>A) {dataValue[id].option_a}</button>
                                <button style={{ backgroundColor: condition_B ? "#1aff1a" : "white" }} className="quiz-option-btn-score" value={dataValue[id].option_b}>B) {dataValue[id].option_b}</button>
                                <button style={{ backgroundColor: condition_C ? "#1aff1a" : "white" }} className="quiz-option-btn-score" value={dataValue[id].option_c}>C) {dataValue[id].option_c}</button>
                                <button style={{ backgroundColor: condition_D ? "#1aff1a" : "white" }} className="quiz-option-btn-score" value={dataValue[id].option_d}>D) {dataValue[id].option_d}</button>
                            </div>

                        </div>

                    </>

                )
            })}
             <button onClick={jump} className="quiz-submit-btn"><i class="fas fa-arrow-circle-left"></i>Go to Quiz Sets</button>
        </>
    )
}

export default Score
