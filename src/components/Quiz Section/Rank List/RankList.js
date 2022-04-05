import React, { useEffect, useState } from 'react';
import NavbarAdmin from '../../Navbar/NavbarAdmin';
import firebaseDB from '../../../firebase';
import "./rankList.css"
import { DataNavigation } from 'react-data-navigation';
import { useNavigate } from 'react-router';

const RankList = () => {

    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [value, setValue] = useState("");

    useEffect(() => {



        firebaseDB.child(`Quiz Folder`).child(`Quiz names`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setValue({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })

    }, [])

    const show = (e) => {

        // console.log(e.target.value)
        firebaseDB.child(`Quiz Folder`).child(`Quiz Results`).child(`${e.target.value}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val()
                })
            } else {
                snapshot({});
            }
        })
    }




    return (
        <div>
            {localStorage.getItem('Admin_Name') !== "" ? null : navigate("/error")}
            <NavbarAdmin />
            <h1 className="header-set">Ranking</h1>

            {Object.keys(value).map((id, index) => {
                console.log(value[id])
                return (
                    <div className='rank-btn-container'>
                        <button className='rank_btn-1' value={value[id]} onClick={show}>{value[id]}</button>
                    </div>
                )
            })}
            <br />

            {Object.keys(data).map((id, index) => {
                return (
                    <div className='rank_list'>
                        <p className='rank_name'>{data[id].name}</p>
                        <p className='rank_score'>{data[id].score}</p>
                        {/* <hr /> */}
                    </div>
                )
            })}
        </div>
    )
}

export default RankList

