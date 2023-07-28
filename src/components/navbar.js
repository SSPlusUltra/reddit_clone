import React, { useState, useRef, useEffect } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
 

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  useEffect(() => {
    // Event listener to close the dropdown when clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar" >
      <div className="logo">
        <Link to='/' className="reddit-icon">My Reddit</Link>
      </div>
      <div className="nav-links">
        <div className="subreddit-dropdown" ref={dropdownRef}>
        <Link to='/profile' href="#" className="nav-link profile" style = {{height: "10px", fontSize: "15px", padding:"5px", width:"50px"}}>Profile</Link>
          <button onClick={toggleDropdown} className="nav-link subreddits-button">Subreddits</button> {/* Add the subreddits-button class */}
          {showDropdown && (
            <div className="dropdown-content">
             <Link to="/form" className="create-subreddit-btn">
      + Create New Subreddit
    </Link>
              {props.formD.map((item) => (
                <Link onClick={toggleDropdown} to={{
                  pathname: '/subredditpage',
                  search: `?title=${encodeURIComponent(item.title)}`,
                }}  key={item.description} href="#" className="dropdown-link">{item.title}</Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
