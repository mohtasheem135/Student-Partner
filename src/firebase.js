import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth"



const firebaseConfig = {
    apiKey: "AIzaSyA_FjjxLk_TcdptHxMDD7qvJ3LAOeLWxkI",
    authDomain: "login-2-f027c.firebaseapp.com",
    databaseURL: "https://login-2-f027c-default-rtdb.firebaseio.com",
    projectId: "login-2-f027c",
    storageBucket: "login-2-f027c.appspot.com",
    messagingSenderId: "1035913125382",
    appId: "1:1035913125382:web:fea3d02fab54d70ff1ad87"
  };

  const fireDB = firebase.initializeApp(firebaseConfig);
export default fireDB.database().ref();