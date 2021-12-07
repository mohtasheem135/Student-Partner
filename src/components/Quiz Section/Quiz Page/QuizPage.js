import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react/cjs/react.development';
import firebaseDB from '../../../firebase';
import "./quizpage.css"
import { DataNavigation } from 'react-data-navigation';
import Navbar from '../../Navbar/Navbar';
import 'font-awesome/css/font-awesome.min.css';

const QuizShop = () => {
    const navigate = useNavigate();

    const generateUniqueId = require('generate-unique-id');

    const [dataValue, setDataValue] = useState({});
    const [quizName, setQuizName] = useState("");


    useEffect(() => {
        setQuizName(DataNavigation.getData('name'))
        // console.log(DataNavigation.getData('name'));
        //  console.log(quizName)



        firebaseDB.child(`Quiz Folder`).child(`Quiz Questions`).child(`${DataNavigation.getData('name')}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setDataValue({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })

    }, [])
    // console.log(dataValue[Object.keys])
    console.log(Object.keys(dataValue).length)
    DataNavigation.setData('total_question', Object.keys(dataValue).length);




    const [selectedNumber, setSelectedNumber] = useState(0);
    const [answer, setAnswer] = useState("");
    const [num, setNum] = useState(0);
    const [attempt, setAttempt] = useState(0);
    const [user, setUser] = useState("")

    DataNavigation.setData('user_answer_id', user)

    
var x=0
    
    


    const selectNumber = numberSelected => {
        

        // firebaseDB.child(`User_Answers`).child(`${DataNavigation.getData('name')}_user_answers`).child(`user_${user}`).push(numberSelected.target.value, (err) => {
        //     if (err) {
        //         console.log(err);
        //     }
        // })


        var j = attempt + 1;
        setAttempt(j)
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
        x=x+1;
        DataNavigation.setData('score', num);
        DataNavigation.setData('attempt', attempt);
        navigate("score")
    }
function get(){
setUser(generateUniqueId())

}

    return (
        <div>
            {/* <Navbar/> */}
            <h2 className="header-1">{quizName}</h2>

            <button className="quiz-submit-btn-top" onClick={finalScore}>submit<i class="fas fa-chevron-circle-right"></i></button>
            


            {Object.keys(dataValue).map((id, index) => {
                //    setAnswer(dataValue[id].answer)

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
                            <hr/>

                        </div>

                    </>

                )
            })}
            <hr/>
            {/* <button onClick={get}>GET</button> */}
            <button className="quiz-submit-btn" onClick={finalScore}>submit<i class="fas fa-chevron-circle-right"></i></button>
            {/* <h1>{score}</h1> */}
        </div>
    )
}

export default QuizShop
