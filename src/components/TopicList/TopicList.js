import React, { useEffect, useState } from 'react';
import firebaseDB from '../../firebase';
import Navbar from '../Navbar/Navbar';
import "./topiclist.css";
import { DataNavigation } from 'react-data-navigation';
import { useNavigate } from 'react-router';

const TopicList = () => {
    const [data, setData] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        firebaseDB.child(`Practice Set Folder`).child(`Practice set Topics`).child(`${DataNavigation.getData('practice_question_set_name')}_topic`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })


        {
            Object.keys(data).map((id, index) => {

                console.log("Topic LIst"+data[id])

            })
        }

    }, [])

    function getData(e){
        console.log(e.target.value);
        DataNavigation.setData('practice_question_topic', e.target.value)
        navigate("practicequestions");
    }

    return (
        <div>
            <Navbar />
            <h2 className="header-1 header-topic">{DataNavigation.getData("practice_question_set_name")} </h2>
            {
                Object.keys(data).map((id, index) => {

                    return (
                        <div className="topic-container">
                            {/* <h1> <hr /></h1> */}
                            <button onClick={getData} className="topic-list" value={data[id]}>{data[id]} <button value={data[id]} onClick={getData} className="topic-list-questions">See Question</button> </button>
                            <hr/>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TopicList
