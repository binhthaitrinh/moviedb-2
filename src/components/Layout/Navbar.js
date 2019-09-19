import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <nav className="menu">
          <div className="menu-left">
            <h2 className="menu-logo">movieDB</h2>
            <ul className="menu-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  TV Shows
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Discover
                </Link>
              </li>
            </ul>
          </div>

          <div className="menu-right">
            <form action="">
              <input
                type="text"
                placeholder="Enter a movie name"
                className="menu-right-search-bar"
              />
              <button className="btn menu-right-search-btn">
                {' '}
                <i className="fas fa-search"></i>
              </button>
            </form>
            <div className="menu-right-user-placeholder"></div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
