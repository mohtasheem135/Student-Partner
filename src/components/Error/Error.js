import React from 'react';
import "./error.css";
import { useNavigate } from 'react-router';

const Error = () => {

    const navigate = useNavigate();

    const handelClick=()=> {
        navigate('/');
    }

  return (
    <div>
        <h1>You are not authorized here go back.....</h1>
        <button onClick={handelClick}>Home</button>
    </div>
  )
}

export default Error