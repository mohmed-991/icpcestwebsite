import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userToken'));

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          ICPC Community
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            <Link
              className="nav-link"
              to="/"
            >
              Home
            </Link>
            <Link
              className="nav-link"
              to="/about"
            >
              About
            </Link>
            <Link
              className="nav-link"
              to="/compiler"
            >
              Compiler
            </Link>
            <Link
              className="nav-link"
              to="/standings"
            >
              Standings
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  className="nav-link"
                  to="/trainings"
                >
                  Trainings
                </Link>
                <Link
                  className="nav-link"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
                <Link
                  className="nav-link"
                  to="/profile"
                >
                  Profile
                </Link>
                <Link
                  className="nav-link"
                  to="#"
                  onClick={handleLogout}
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </Link>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link
                  className="nav-link"
                  to="/register"
                >
                  Register
                </Link>
                <Link
                  className="nav-link"
                  to="/login"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;