import React, { useState } from 'react';
import PostDisplay from './displaypost';
import { useLocation } from 'react-router-dom';
import CommentForm from './commentform';
import './commentpage.css'
import Communitydiv from './communitydiv';

const comments = [];
const CommentPage = (props) => {

const location = useLocation();

const [allComments, setAllComments] = useState(comments);
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const plainId = id.replace(/"/g, '');
  const post = props.pdata.filter((post) => post.pid === plainId)[0];
  if (!post) {
    // Render a loading message or handle the case where the post is not found
    return <p>Loading...</p>;
  }
  


   console.log(post)
  const handleCommentSubmit = (comment, name) => {
    // Create a new comment object with an ID and user-provided text
    const newComment = {
      id: Date.now(), // Generate a unique ID for the comment
      text: comment,
      author: "u/"+ name
    };
    // Add the new comment to the existing comments
    setAllComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className='comment-page-container'>
      <div className='inner'>      {/* Render the post data at the top */}
      <br></br>
    
      <PostDisplay
        v1={post.title}
        v2={post.description}
        v3={post.id}
        v4={post.vote}
        UpclickHandler = {props.Uv}
        DownclickHandler = {props.Dv}
      />
      <br></br>

      <Communitydiv className='comm' title={post.subreddit} newD={props.formD}/>
      </div>

       <CommentForm newd={post} onSub={handleCommentSubmit} />

      {/* Map over the comments and display them below the post */}

      {allComments.map((comment) => (
        <div className='commentsss'>
           <div className='bru' key={comment.id}>
            
           <h5>{comment.author}</h5> {/* Display the comment title or appropriate property */}
           <p>{comment.text}</p>   {/* Display the comment text or appropriate property */}
         </div>
         </div>
      ))}
      </div>
  
  );
};

export default CommentPage;
