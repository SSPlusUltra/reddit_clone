import React, { useState } from 'react';
import './commentform.css'; // Import the CSS file

const CommentForm = (props) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onSubmit function passed from the parent with the comment data
    props.onSubmit(comment);
    // Reset the comment input after submission
    setComment('');
  };

  return (
    <div className="comment-form-container"> {/* Add the container div */}
      <h2>Leave a Comment</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Write your comment..."
          required
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
