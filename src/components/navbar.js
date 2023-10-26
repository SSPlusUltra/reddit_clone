import React, { useState, useRef, useEffect } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import LogoS from '../logo3.jpg'
import SignOut from './sign-out';
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
  <Link to='/homepage'>
    <img src={LogoS} className= "reddit-icon"style={{ width: '60px', height: '60px', margin:'2px 0px 1px' }}/>
  </Link>
</div>
<div className='logo-text'>
  <h3>ThreadShare</h3>
</div>
<div className="nav-links">
        <div className="subreddit-dropdown" ref={dropdownRef}>
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
                }}  key={item.id} href="#" className="dropdown-link">{item.title}</Link>
              ))}
            </div>
          )}
        </div>
      </div>
<Link to='/profile'  className="profile" style = {{margin:'5px' ,height: "25px", fontSize: "15px", padding:"10px 5px 5px 20px", width:"60px"}}>Profile</Link>
<SignOut/>
    </nav>
  );
};

export default Navbar;
