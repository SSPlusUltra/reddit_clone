// PostCard.js
import React from 'react';
import './displaypost.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import Vote from './vote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons'

const PostDisplay = (props) => {



    
if (!props.v1) {
    return <p>No posts available.</p>;
  }

  return(
  <>
 
  <div className="post-card">
 
  <div className="post-footer">
    <Vote  Upclickhandle={props.UpclickHandler}
        Downclickhandle={props.DownclickHandler} postId = {props.v3} postv={props.v4} uid={props.v5} upre = {props.upress} dpre = {props.dpress}/>
  </div>
    <div className='right-part'>
    <div className="post-header">
    <h3 className="post-title">{props.v1}</h3>
  </div>

  <div className="post-content">
    <p>{props.v2}</p>
  </div>
<div className='footer'>
 <div className='comments-main'>
<Link to={{
          pathname: '/commentpage',
          search: `?id=${encodeURIComponent(props.v3)}`,
        }} className="comments">
       <FontAwesomeIcon style={{color:'white'}}  icon={faComment} size="xl"/>
       <span style={{color:'white', margin:"0px 70px 0px 5px"}} >comments</span>
 
    </Link>
    </div>

    <div className='comments-main'>
<Link to={{
          pathname: '/commentpage',
          search: `?id=${encodeURIComponent(props.v3)}`,
        }} className="comments">
      <FontAwesomeIcon icon={faBookmark} style={{color:'white'}} size="xl" />
       <span style={{color:'white', margin:"0px 70px 0px 5px"}} >save</span>
 
    </Link>
    </div>


    <div className='comments-main'>
<Link to={{
          pathname: '/commentpage',
          search: `?id=${encodeURIComponent(props.v3)}`,
        }} className="comments">
       <FontAwesomeIcon icon={faShare} style={{color:'white'}} size="xl" />
       <span style={{color:'white', margin:"0px 70px 0px 5px"}} >share</span>
 
    </Link>
    </div>



    </div>


    </div>
</div>
    </>)



};

export default PostDisplay;
