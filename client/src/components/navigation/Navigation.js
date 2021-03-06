import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from  '../../services/authService';


const Navigation = ({ isAuthenticated, logout, user }) => {
  return (
    <Fragment>
    <nav className="navbar navbar-expand-md navbar-light bg-light mobile-only-nav">

      <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#mobileOnlyNavigation" aria-controls="mobileOnlyNavigation" aria-expanded="false" aria-label="Navigáció nyitása">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobileOnlyNavigation">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard/transactions">Összegzés <span className="sr-only">(jelenlegi)</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard/challenges">Kihívások</NavLink>
          </li> 
          <li className="nav-item">
            <NavLink className="nav-link" to="#" onClick={() => logout()}>Kijelentkezés</NavLink>
          </li>
        </ul>
      </div>
    </nav>
    </Fragment>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Navigation);