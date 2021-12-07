import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import "./practiceset.css";
import { useNavigate } from 'react-router';
import firebaseDB from '../../firebase';
import { DataNavigation } from 'react-data-navigation';

const PracticeSet = () => {

    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        firebaseDB.child(`Practice Set Folder`).child("Practice Sets Name").on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })

    }, [])

    const [selectedNumber, setSelectedNumber] = useState("");
    const selectNumber=(e) => {
        e.preventDefault();
        setSelectedNumber(e.target.value);
        
        DataNavigation.setData('practice_question_set_name', e.target.value); 
        console.log(e.target.value)
        navigate("topiclist")
        // console.log(selectedNumber + "  -")
    }


    return (
        <div>
            <Navbar />
            <h2 className="header-1 header-practice">All our Practice Sets</h2>
            {Object.keys(data).map((id, index) => {
                // console.log(data[id])
                return (
                    <div className="practice-set-container">
                        <h3 className="practice-set-topic">{data[id]}</h3>
                        <button onClick={selectNumber}  value={data[id]} className="practice-set-btn">Practice</button>
                        
                        {/* <button className="practice-set-btn"  >jump</button> */}
                    </div>
                )
            })}
        </div>
    )
}

export default PracticeSet
