import firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from 'react';
import './App.css';
import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

function App() {
 const [user, setUser] = useState({
    isSignedIn : false,
    name : ' ',
    email : ' ',
    password : ' ',
    photo : ' '
 })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn= () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res =>{
      const {displayName, email, photoURL} = res.user;
      // console.log(displayName, email, photoURL)
      // console.log(res);
      const signedInUser = {
        isSignedIn : true,
        name : displayName,
        email : email,
        photo : photoURL
     }
     setUser(signedInUser)
    })
    .catch((error) => {
      // Handle Errors here.
      // var errorCode = error.code;
    console.log(error) 
    console.log(error.message) 
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // // ...
    });
  }
  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(res=> {
      const signedOutUser = {
        isSignedIn : false,
        name : ' ',
        email : ' ',
        photo : ' '
     }
     setUser(signedOutUser)
    })
      // Sign-out successful.
    .catch(error => {
      // An error happened.
    });
    // console.log('SignOut Clicked');
  }

  // Fields Validation
  const handleBlur = (event) =>{
    // console.log(event.target.name, event.target.value);
let isFieldValid = true;
    if(event.target.name ==='email'){
      const isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name ==='password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test( event.target.value);
      isFieldValid=isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo)
    }
    // console.log(event.target.value);
  }
  const handleSubmit = () => {
    // console.log("Clicked");
  }
  return (
    <div className="App">
      {
        user.isSignedIn ?  <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button>
      }
      
    {
      user.isSignedIn && <div>
         <p>Welcome, {user.name}</p>
         <p>Email : {user.email}</p>
         <img src={user.photo} alt=""/>
      </div>
    }
    <h1>Our own Authentication</h1>
    <p> Name : {user.name}</p>
    <p>Email : {user.email}</p>
    <p>Password : {user.password}</p>
   <form onSubmit={handleSubmit}>
     <input name="name" onBlur={handleBlur}  placeholder="Your Name"  type="text"/>
     <br/>
        <input type="text" onBlur={handleBlur} name="email" placeholder="Enter Your Name" required/>
        <br/>
        <input type="password" onBlur={handleBlur} name="password"  placeholder="Enter Your PassWord" required />
        <br/>
        <input type="submit" name="" id=""/>
   </form>
    </div>
  );
}

export default App;
