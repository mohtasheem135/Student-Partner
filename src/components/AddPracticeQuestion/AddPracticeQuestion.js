import React, { useState } from 'react';
import "./addpracticequestion.css"
import { DataNavigation } from 'react-data-navigation';
import NavbarAdmin from '../Navbar/NavbarAdmin';
import firebaseDB from '../../firebase';
import { useNavigate } from 'react-router';

const AddPracticeQuestion = () => {

    const navigate = useNavigate();
    const [num, setNum] = useState(0);

    const values = {
        question:"",
        answer:""
    }
    const [initialState, setInitialState] = useState("");
    const { question, answer } = initialState;

    const handelSubmit = (e) => {
        e.preventDefault()
        firebaseDB.child("Practice Set Folder").child(`Practice Questions`).child(`${DataNavigation.getData(`practice_question_set`)}`).child(`${DataNavigation.getData('practice_question_topic')}`).push(initialState, (err) => {
            if (err) {
                console.log(err);
            }
        })
        navigate("/addpracticeset/addpracticequestion");
        setInitialState({
            question:"",
            answer:""
        })

        var i=num+1;
        setNum(i)
        console.log(num)
    }

    const handelInputChange = (e) => {
        let { name, value } = e.target;
        setInitialState({
            ...initialState,
            [name]: value,
        })
    }

    
    const update = ()=>{
        var i=num+1;
        setNum(i)
        console.log(num)
    }


    return (
        <div>
             {localStorage.getItem('Admin_Name') !== "" ? null : navigate("/error")}
            <NavbarAdmin />
            <p></p>
          
            <h2 className="header-1">{DataNavigation.getData('practice_question_set')} - {DataNavigation.getData('practice_question_topic')} </h2>
            <h3 className="numbering" >{num} Question's added</h3>
                
                <div className="App">
                    <form className="option-add-container" >
                        <textarea type="text" placeholder="Type Your Question Here" value={question} name="question" onChange={handelInputChange} className="question-box" />
                        <textarea type="text" placeholder="Type Your Answer Here" value={answer} name="answer" onChange={handelInputChange} className="question-box" />
                        <button onClick={handelSubmit} type="submit"   className="submit-btn">Add</button>
                    </form>
                    
                </div>
        </div>
    )
}

export default AddPracticeQuestion
