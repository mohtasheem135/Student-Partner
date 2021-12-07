import React from 'react';
import Navbar from '../Navbar/Navbar';
import "./home.css"
import img from "./images/study_3.png"

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="home-container">

                <div className="study-home-image">
                    <img src={img} className="image" />
                    <div className="about-missioned">
                        <p className="missioned-h3">About <p className="style-p">S</p>tudent <p className="style-p">P</p>artner</p>
                        <p className="missioned-p"><p className="style-p">S</p>tudent <p className="style-p">P</p>artner is a simple web application where students can practice the Questions of various 
                        topics, apart from practicing they can also take part in Quizes.
                        <br/>New Practice Sets and Quiz sets can also be created very easily.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home
