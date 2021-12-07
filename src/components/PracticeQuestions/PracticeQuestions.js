import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import "./practicequestions.css"
import firebaseDB from '../../firebase';
import { useNavigate } from 'react-router';
import { DataNavigation } from 'react-data-navigation';
import { render } from '@testing-library/react';

const PracticeQuestions = () => {

    const [data, setData] = useState("");
    const [show, setShow] = useState(false)

    useEffect(() => {
        firebaseDB.child("Practice Set Folder").child(`Practice Questions`).child(`${DataNavigation.getData("practice_question_set_name")}`).child(`${DataNavigation.getData('practice_question_topic')}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })
        // console.log(data)

    }, [])
    {
        Object.keys(data).map((id, index) => {
            console.log("Questions :-" + data[id].question)
            console.log("Answers :-" + data[id].answers)
        })
    }



    return (
        <div>
            <Navbar />
            <h2 className="header-1 header-practice-questions"> {DataNavigation.getData("practice_question_set_name")} - {DataNavigation.getData('practice_question_topic')}</h2>
            {Object.keys(data).map((id, index) => {
                return (
                    <div className="question-answer-box">
                        <h3 className="practice-question"><b>Q {index + 1} </b>)  {data[id].question}
                            {/* <button onClick={()=>setShow(true)}>Show</button>
                          <button onClick={()=>setShow(false)}>Hide</button> */}
                        </h3>
                        <p className="practice-answer"><b>Answer</b> :- {data[id].answer}</p>
                        <hr/>
                        {/* {
                            show?<h2>Answer -- {data[id].answer}</h2> : null
                            
                        } */}

                    </div>
                )
            })}
        </div>
    )
}

export default PracticeQuestions
