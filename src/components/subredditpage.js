// SubredditPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './subredditpage.css'
import { useLocation } from 'react-router-dom';
import PostDisplay from './displaypost';
import Communitydiv from './communitydiv';

const SubredditPage = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get('title');
  const subredditPosts = props.pdata.filter((post) => post.subreddit === title);

  return (
    <div className='ali'>
      <h1>{title}</h1>
      <div className='thread-page-container'>

      {subredditPosts.length > 0 ? (
        subredditPosts.map((post) => (
          <PostDisplay  v1={post.title}
          v2={post.description}
          v3={post.pid}
          v4={post.vote}
          v5={post.id}
          UpclickHandler = {props.Uv}
          DownclickHandler = {props.Dv} 
          upress = {post.upvotepressed}
          dpress = {post.downvotepressed}
          key={post.pid}/>
          
        ))
      ) : (
        <p>No posts found for this subreddit. Click on the "+" button below to create posts in this subreddit</p>
      )}

      <Communitydiv title={title} newD = {props.formD}/>

      </div>


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
