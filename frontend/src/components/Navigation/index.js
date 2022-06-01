import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div>
      <div className="header">
        <div className="logo">
          CorgiNote
        </div>
        <nav className='link'>
          <span>
            <NavLink to="/login">Log In</NavLink>
            <div className="bar"></div>
          </span>
          </nav>
          <nav className='link'>
          <span>
            <NavLink to="/signup">Sign Up</NavLink>
            <div className="bar"></div>
          </span>
        </nav>
      </div>
        <div className='homepage-text'>
          Stay organized with CorgiNote!
        </div>
      </div>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation; 
