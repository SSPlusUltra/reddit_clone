import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar';
import './App.css'
import SubredditCreationForm from './components/subreddit';
import { useState } from 'react';
import SubredditPage from './components/subredditpage';
import CreatePosts from './components/postcreate';
import CommentPage from './components/commentpage';
import Profile from './components/profile';
import HomePage from './components/homepage';
import React from 'react';
import { useEffect } from 'react';
import SignUp from './components/signup';
import SignIn from './components/sign-in';
import SignOut from './components/sign-out';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
const arr = []
const pdata= []
function App() {
const [data, setData] = useState(arr)
const [postdata, setPostData] = useState(pdata)
const[isLoggedin, setIsLoggedin] = useState(false);
const navigate = useNavigate();

useEffect(()=>{
    fetchsubs();
  },[data])

  useEffect(()=>{
    fetchposts();
  },[postdata])
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    });
  
    // Cleanup the observer when the component unmounts
    
  }, []);

  async function subhandler(movie){
    const response = await fetch('https://reddit-react-46092-default-rtdb.firebaseio.com/subreddit.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const dataR = await response.json();
   }


   async function posthandler(pdata){
    const response = await fetch('https://reddit-react-46092-default-rtdb.firebaseio.com/posts.json', {
      method: 'POST',
      body: JSON.stringify(pdata),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const dataR = await response.json();

   }


   async function updatevotehandler(id,pid,  Vote, voteType){
    const res = await fetch('https://reddit-react-46092-default-rtdb.firebaseio.com/posts.json');
    const R = await res.json();
    console.log(R)
    const reqid = Object.keys(R).find((key) => (
      R[key].pid === pid
    ));
    id= auth.currentUser.uid;
    
    const newres = await fetch(`https://reddit-react-46092-default-rtdb.firebaseio.com/posts/${reqid}.json`);
    const pd = await newres.json();
    if (voteType === 'upvote') {
      if (!pd.upvotepressed[id]) {
          if (pd.downvotepressed[id]) {
              pd.vote += 2;
          } else {
              pd.vote += 1;
          }
          pd.upvotepressed[id] = true;
      } else {
          pd.vote -= 1;
          pd.upvotepressed[id] = false;
      }
  
      // Remove user's ID from the downvotepressed array if it's there
      pd.downvotepressed[id] = false;
  } else if (voteType === 'downvote') {
      if (!pd.downvotepressed[id]) {
          if (pd.upvotepressed[id]) {
              pd.vote -= 2;
          } else {
              pd.vote -= 1;
          }
          pd.downvotepressed[id] = true;
      } else {
          pd.vote += 1;
          pd.downvotepressed[id] = false;
      }
  
      // Remove user's ID from the upvotepressed array if it's there
      pd.upvotepressed[id] = false;
  }
  
    console.log(pd)
    
    const response = await fetch(`https://reddit-react-46092-default-rtdb.firebaseio.com/posts/${reqid}.json`, {
      method: 'PUT',
      body: JSON.stringify(pd),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    fetchposts();
   }
  

  

  async function fetchsubs(){
    const response = await fetch('https://reddit-react-46092-default-rtdb.firebaseio.com/subreddit.json');
  const dataR = await response.json();
  const extractedData = Object.keys(dataR).map((key) => ({
    title: dataR[key].title,
    description: dataR[key].description,
    id: dataR[key].id
  }));

  setData(extractedData)
  }

  async function fetchposts(){
    const response = await fetch('https://reddit-react-46092-default-rtdb.firebaseio.com/posts.json');
  const postsR = await response.json();
  const extractedpostData = Object.keys(postsR).map((key) => ({
    title: postsR[key].title,
    description: postsR[key].description,
    subreddit: postsR[key].subreddit,
    vote: postsR[key].vote,
    date: postsR[key].date,
    id: postsR[key].id,
    pid:postsR[key].pid,
    upvotepressed: postsR[key].upvotepressed,
    downvotepressed: postsR[key].downvotepressed    
  }));

  setPostData(extractedpostData)
  }
  





  let ne=0;

  const globalupvote = (id, pid) => {
    postdata.map((d)=>{
      if(d.pid === pid){
         ne = d.vote;
      }
    })
    if(ne===1){
      ne = 0;
    }

    else if(ne===-1){
      ne=1
    }
    else{
      ne=1;
    }
    updatevotehandler(id, pid,  ne, 'upvote');
  };
  const globaldownvote = (id, pid) => {
    postdata.map((d)=>{
      if(d.pid === pid){
        ne = d.vote;
     }
    })
    if(ne===-1){
      ne = 0;
    }

    else if(ne===1){
      ne=-1
    }
    else{
      ne=-1;
    }
    updatevotehandler(id,pid, ne, 'downvote');
  };

  
  return (
  <>
     {isLoggedin && <Navbar formD={data} />}

     <Routes>
  <Route path="/signin" element={<SignIn  />} />
  {isLoggedin && (
    <>
        <Route path="/signout" element={<SignOut  />} />
      <Route path="/homepage" element={<HomePage pdata={postdata} Uv={globalupvote} Dv={globaldownvote} />} />
      <Route path="/form" element={<SubredditCreationForm onsubreddit={subhandler} />} />
      <Route path="/profile" element={<Profile data={data} />} />
      <Route path="/subredditpage" element={<SubredditPage formD={data} pdata={postdata} Uv={globalupvote} Dv={globaldownvote} />} />
      <Route path="/postcreate" element={<CreatePosts oncreate={posthandler} formD={data} />} />
      <Route path="/commentpage" element={<CommentPage  formD={data} pdata={postdata} Uv={globalupvote} Dv={globaldownvote} />} />
    </>
  ) }
  <Route path="/" element={<SignUp />} />
</Routes>


      </>
  )   
}

export default App
