import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import React from "react";

const SignIn = (props)=>{
    const navigate = useNavigate();

    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');
    const signIn=(event)=>{
       event.preventDefault();
   signInWithEmailAndPassword(auth, email, password).then((useCredential)=>{


    // Update the user profile here
    console.log(useCredential.user)
    navigate('/homepage')
   

   }).catch((e)=>{
    console.log(e);
   })
    

    }

    return(
        <div className="sign-in-container">
            <form onSubmit={signIn}>
                <h1>Log In</h1>
                <input type='email' placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type='password' placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button type='submit'>Log In</button>
            </form>
        </div>
    )
}

export default SignIn;