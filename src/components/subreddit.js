import React, { useState } from 'react';
import './subreddit.css'
import { useNavigate } from 'react-router-dom';

const SubredditCreationForm = (props) => {
 const [newtitle, setTitle] = useState('')
 const [newdesc, setDesc] = useState('')
const navigate = useNavigate()
 const handleTitle = (event)=>{
    setTitle(event.target.value);
 }


 const handleDesc = (event)=>{

    setDesc(event.target.value);

 }


 const handleSubmit = (event)=>{
    event.preventDefault();
    const data = {
        title: "r/"+newtitle,
        description: newdesc
    }
props.onsubreddit(data);
const subredditTitle = encodeURIComponent(data.title);
const url = `/subredditpage?title=${subredditTitle}`;
setTitle('')
setDesc('')
navigate(url)
    

 }
  return (
    <div className="container">
      <h2>Create Subreddit</h2>
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
        <button type="submit">Create Subreddit</button>
      </form>
    </div>
  );
};

export default SubredditCreationForm;
