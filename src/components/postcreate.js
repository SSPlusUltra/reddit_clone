import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import './postcreate.css'
import {v4} from 'uuid'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Communitydiv from './communitydiv';
const CreatePosts =(props)=>{
  const [onShow, setonShow] = useState(false);
  const [subThread, setsubThread] = useState(null)

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

 const uid = auth.currentUser.uid;

 const handleSubmit = (event)=>{
    event.preventDefault();
    const currentDate = new Date().toISOString(); 
    const data = {
        pid: v4(),
        id: uid,
        title: newtitle,
        description: newdesc,
        subreddit: par || '',
        date: currentDate,
        vote:0,
        upvotepressed:{'initial': true},
        downvotepressed:{'initial': true}
    }
    props.oncreate(data)
    const subredditTitle = encodeURIComponent(data.subreddit);
    const url = `/subredditpage?title=${subredditTitle}`;
setTitle('')
setDesc('')
navigate(url);

 }
 return (
  <form onSubmit={handleSubmit}>
  <div className='other-container'>
  <div className="post-container">
    <div onClick={()=>{
      setonShow(!onShow)
    }} className='sub-thread-dropdown'>
      <div className='main-button'> choose a community </div>
      <span className='caret-down'><FontAwesomeIcon icon={faCaretDown} /></span>
    </div>
   {onShow &&
    <div className='drop-down-content'>
    {props.formD.map((item) => (
               <span onClick={()=>{
                  setsubThread(item.title)
                  navigate(`/postcreate?par=${encodeURIComponent(item.title)}`);
               }} className='sp'>{item.title}</span>
              ))}
  </div>
   }
   
    <input onChange={handleTitle} type='text-area' placeholder='Title' className="input-field"  />
    <input onChange={handleDesc} type='text-area' placeholder='Description(optional)' className="input-field-large" />
    <button className='post-it' type='submit'>Post</button>
  </div>
{subThread && <Communitydiv title={subThread} newD={props.formD}/>
   }
  
  </div>
  </form>
);

};

export default CreatePosts;