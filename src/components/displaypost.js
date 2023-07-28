// PostCard.js
import React from 'react';
import './displaypost.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const PostDisplay = (props) => {

    const [upvote, setUpvote] = React.useState(0);
    const [downvote, setDownvote] = React.useState(0);
    
    const upclickHandler = () => {
      if (upvote === 1) {
        setUpvote(0);
      } else {
        setUpvote(1);
        setDownvote(0); // Set downvote to 0 when upvoting
      }
    };
    
    const downclickHandler = () => {
      if (downvote === -1) {
        setDownvote(0);
      } else {
        setDownvote(-1);
        setUpvote(0); // Set upvote to 0 when downvoting
      }
    };
    
if (!props.v1) {
    return <p>No posts available.</p>;
  }

  return(<div className="post-card">
  <div className="post-header">
    <h3 className="post-title">{props.v1}</h3>
  </div>
  <div className="post-content">
    <p>{props.v2}</p>
  </div>
  <div className="post-footer">
    <div className="vote-section">
      <button onClick= {upclickHandler} className="vote-button">▲</button>
      <span className="votes-count">{upvote}</span>
      <button onClick={downclickHandler} className="vote-button">▼</button>
      <span className="votes-count">{downvote}</span>
    </div>
    <span className="author"></span>
    <span>Date:{props.v4}</span>
    <Link to={{
          pathname: '/commentpage',
          search: `?id=${encodeURIComponent(props.v3)}`,
        }} className="comments">
      <i className="fa fa-comments"></i>view comments
    </Link>
  </div>
</div>)


};

export default PostDisplay;
