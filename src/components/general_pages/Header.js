import React from 'react';
import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/auth';

import '../../styles/components/_header.scss';

const Header = ({ isLoggedIn = false, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <h1>Kaligon CRM: Connect & Grow</h1>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Home Page
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Log In
          </NavLink>
          <NavLink to="/signup" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Sign Up
          </NavLink>
        </div>
      )}
    </header>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
