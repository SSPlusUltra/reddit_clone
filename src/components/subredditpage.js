// SubredditPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './subredditpage.css'
import { useLocation } from 'react-router-dom';
import PostDisplay from './displaypost';

const SubredditPage = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get('title');
  const subredditPosts = props.pdata.filter((post) => post.subreddit === title);

  return (
    <div>
      <h1>{title}</h1>

      {subredditPosts.length > 0 ? (
        subredditPosts.map((post) => (
          <PostDisplay v1={post.title} v2={post.description} v3={post.id} v4={post.date} />
        ))
      ) : (
        <p>No posts found for this subreddit. Click on the "+" button below to create posts in this subreddit</p>
      )}



      <Link to={{
                  pathname: '/postcreate',
                  search: `?par=${encodeURIComponent(title)}`,
                }}  className="add-post-btn">
        +
      </Link>
    </div>
  );
};

export default SubredditPage;
