import React, { useContext, useEffect, useState } from 'react'

import "./addquizquestion.css";
import firebaseDB from '../../../firebase';
import { useNavigate } from 'react-router';
import { DataNavigation } from 'react-data-navigation';
import NavbarAdmin from '../../Navbar/NavbarAdmin';


const AddQuizQuestion = () => {

    const navigate = useNavigate();


    const [text, setText] = useState("");
    const [ques, setQues] = useState("");
    const [quizName, setQuizName] = useState("");
    const [value2, setValue2] = useState("");

    useEffect(()=>{
        // console.log(DataNavigation.getData('quiz_name'))
        setQuizName(DataNavigation.getData('quiz_name'))
    })

function getData(e) {
       
    setValue2(text)
   
}
    

    const values = {
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        option_x: '',
        answer:''
    }
    const [initialState, setInitialState] = useState("");
    const { option_a, option_b, option_c, option_d, option_x, answer } = initialState;

    const handelSubmit = (e) => {
        e.preventDefault()
        firebaseDB.child(`Quiz Folder`).child(`Quiz Questions`).child(`${quizName}`).push(initialState, (err) => {
            if (err) {
                console.log(err);
            }
        })
        navigate("/addquiz/addquizquestion");
        setInitialState({
            option_a: "",
            option_b: "",
            option_c: "",
            option_d: "",
            option_x: "",
            answer:""
        })
    }

    const handelInputChange = (e) => {
        let { name, value } = e.target;
        setInitialState({
            ...initialState,
            [name]: value,
        })
    }

    

    

    const [num, setNum] = useState(0);
    const update = ()=>{
        var i=num+1;
        setNum(i)
        console.log(num)
    }
    // console.log(num)
    

    return (
        <div>
            <div>
                <NavbarAdmin/>
                
                {/* <h2>{DataNavigation.getData('number')} Questions have been added</h2> */}
                <h2 className="header-1">Adding the Questions to "{quizName}"</h2>
                <h3 className="numbering" >{num} Question's added</h3>
                <div className="App">
                    {/* <div className="question-container">
                        <h3 className="head-h3">Previous Question</h3>
                        <h2 className="opp">{DataNavigation.getData('index')}) Question :- {DataNavigation.getData('question')} </h2>
                        <h2 className="opp">Option(a) :- {DataNavigation.getData('option-a')} </h2>
                        <h2 className="opp">Option(b) :- {DataNavigation.getData('option-b')} </h2>
                        <h2 className="opp">Option(c) :- {DataNavigation.getData('option-c')} </h2>
                        <h2 className="opp">Option(d) :- {DataNavigation.getData('option-d')} </h2>
                        
                    </div> */}
                    
                    <form className="option-add-container" onSubmit={handelSubmit}>
                        <textarea type="text" placeholder="Type Your Question Here" value={option_x} name="option_x" className="question-box" onChange={handelInputChange} />
                        <input type="text" placeholder="Option- A" value={option_a} name="option_a" className="options" onChange={handelInputChange} />
                        <input type="text" placeholder="Option- B" value={option_b} name="option_b" className="options" onChange={handelInputChange} />
                        <input type="text" placeholder="Option- C" value={option_c} name="option_c" className="options" onChange={handelInputChange} />
                        <input type="text" placeholder="Option- D" value={option_d} name="option_d" className="options" onChange={handelInputChange} />
                        <input type="text" placeholder="Answer" value={answer} name="answer" className="options" onChange={handelInputChange} />
                        <button type="submit" onClick={update}  className="submit-btn">Add</button>
                    </form>
                    {/* <button className="submit-btn" onClick={update}>Increase</button> */}

                </div>
            </div>
        </div>
    )
}

export default AddQuizQuestion
