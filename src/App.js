import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar';
import './App.css'
import SubredditCreationForm from './components/subreddit';
import { useState } from 'react';
import SubredditPage from './components/subredditpage';
import CreatePosts from './components/postcreate';
import PostDisplay from './components/displaypost';
import CommentPage from './components/commentpage';
import Profile from './components/profile';
import HomePage from './components/homepage';
const arr = []
const pdata= []
function App() {
const [data, setData] = useState(arr)
const [postdata, setPostData] = useState(pdata)
  const handleSub = (formdata)=>{
     setData((prev)=>{
      return [...prev,formdata]
     })
  }


  const handlePost = (value)=>{
    setPostData((prev)=>{
      return [value, ...prev]
     })

  }

  return (
    <>
    <Navbar formD={data}/>
      <Routes>
      <Route path="/" element={<HomePage postdata={postdata}/>}/>
        <Route path="/form" element={<SubredditCreationForm  onsubreddit={handleSub}/>}/>
        <Route path="/profile" element={<Profile data = {data}/>}/>
        <Route path="/subredditpage" element={<SubredditPage  pdata={postdata}/>}/>
        <Route path="/postcreate" element={<CreatePosts oncreate={handlePost}/>}/>
        <Route path="/commentpage" element={<CommentPage pdata={postdata} />}/>
      </Routes>
    </>
  )
}

export default App
