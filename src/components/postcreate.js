import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import './subreddit.css'
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
const CreatePosts =(props)=>{

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const par = queryParams.get('par');
const navigate = useNavigate();
const newT = encodeURIComponent(par);
 const [newtitle, setTitle] = useState('')
 const [newdesc, setDesc] = useState('')

 const handleTitle = (event)=>{
    setTitle(event.target.value);
 }


 const handleDesc = (event)=>{

    setDesc(event.target.value);

 }


 const handleSubmit = (event)=>{
    event.preventDefault();
    const currentDate = new Date().toISOString(); 
    const data = {
        id: uuidv4(),
        title: newtitle,
        description: newdesc,
        subreddit: par || '',
        date: currentDate
    }
    props.oncreate(data)
    const subredditTitle = encodeURIComponent(data.subreddit);
    const url = `/subredditpage?title=${subredditTitle}`;
setTitle('')
setDesc('')
navigate(url);

 }
  return (
    <div className="container">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newtitle}
            onChange={handleTitle}
            placeholder="Enter subreddit title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={newdesc}
            onChange={handleDesc}
            rows="4"
            placeholder="Enter subreddit description"
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePosts;