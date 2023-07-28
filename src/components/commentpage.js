import React, { useState } from 'react';
import PostDisplay from './displaypost';
import { useLocation } from 'react-router-dom';
import CommentForm from './commentform';
import './commentpage.css'

const comments = [];
const CommentPage = (props) => {

const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const plainId = id.replace(/"/g, '');
  const post = props.pdata.filter((post) => post.id === plainId)[0];
  console.log('props.pdata:', props.pdata);
  console.log('id:', id);



  const [allComments, setAllComments] = useState(comments);

  const handleCommentSubmit = (comment) => {
    // Create a new comment object with an ID and user-provided text
    const newComment = {
      id: Date.now(), // Generate a unique ID for the comment
      text: comment,
    };
    // Add the new comment to the existing comments
    setAllComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div>

      {/* Render the post data at the top */}
      <PostDisplay
        v1={post.title}
        v2={post.description}
        v3={post.id}
      />
       <CommentForm onSubmit={handleCommentSubmit} />

      {/* Map over the comments and display them below the post */}
      {allComments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentPage;
