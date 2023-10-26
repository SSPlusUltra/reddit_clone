import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import SignIn from "./sign-in";
import { Link } from "react-router-dom";
import React from "react";


const SignUp = ()=>{
    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');
    const[userName, setuserName] = React.useState('');
    const signUp=(event)=>{
       event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((useCredential)=>{
        const user = useCredential.user;
        updateProfile(user, {
            displayName: userName
          })
    console.log(useCredential)
   }).catch((e)=>{
    console.log(e);
   })
    

    }

    return(
        <div className="sign-in-container">
            <form onSubmit={signUp}>
                <h1>Create an account</h1>
                <input type='username' placeholder="enter usaername" value={userName} onChange={(e)=>setuserName(e.target.value)}></input>
                <input type='email' placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type='password' placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button type='submit'>Sign Up</button>
                <Link to="http://localhost:3000/signin" className="ugh">
                <button>Already have an account? signin?</button>
              </Link>

            </form>
        </div>
    )
}

export default SignUp;