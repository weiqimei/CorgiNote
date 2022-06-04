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
      <div className='navlinks'>
        <div>
          <ProfileButton user={sessionUser} />
        </div>
        <div>
          <NavLink to="/notebooks">View All Notebooks</NavLink>
        </div>
        <div>
          <NavLink to="/notes/new">Create A Note</NavLink>
        </div>
      </div>
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
        <div class="dog">
          <div class="heart heart--1"></div>
          <div class="heart heart--2"></div>
          <div class="heart heart--3"></div>
          <div class="heart heart--4"></div>
          <div class="head">
            <div class="year year--left"></div>
            <div class="year year--right"></div>
            <div class="nose"></div>
            <div class="face">
              <div class="eye eye--left"></div>
              <div class="eye eye--right"></div>
              <div class="mouth"></div>
            </div>
          </div>
          <div class="body">
            <div class="cheast"></div>
            <div class="back"></div>
            <div class="legs">
              <div class="legs__front legs__front--left"></div>
              <div class="legs__front legs__front--right"></div>
              <div class="legs__back legs__back--left"></div>
              <div class="legs__back legs__back--right"></div>
            </div>
            <div class="tail"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/home">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation; 
