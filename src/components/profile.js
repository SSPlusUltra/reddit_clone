import React from 'react';
import './profile.css'
import { Link, useNavigate } from 'react-router-dom';

const Profile = (props) => {
    const navigate = useNavigate()

    const handleNavigate = (title) => {
        // Replace "/subredditpage" with the appropriate route
        navigate(`/subredditpage?title=${encodeURIComponent(title)}`);
      };
    
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <h2>My Subreddits</h2>
      <ul className="subreddit-list">
      {props.data.map((item) => (
          <li  onClick={() => handleNavigate(item.title)} className="subreddit-item">
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
