import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from  '../../services/authService';

import AuthModal from '../auth/AuthModal';

const Navigation = ({ isAuthenticated, logout, user }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  return (
    <Fragment>
    <nav className="navbar navbar-expand-md navbar-light bg-light mobile-only-nav">

      <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#mobileOnlyNavigation" aria-controls="mobileOnlyNavigation" aria-expanded="false" aria-label="Navigáció nyitása">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobileOnlyNavigation">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="#">Főoldal <span className="sr-only">(jelenlegi)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Bevételek</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Kiadások</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Kihívások</Link>
          </li> 
          {isAuthenticated ? (
            <Fragment>
            <li className="nav-item">
              <Link className="nav-link" to="#" onClick={() => logout()}>Kijelentkezés</Link>
            </li>
            </Fragment>
          ) : (
            <Fragment>
            <li className="nav-item">
              <Link className="nav-link" to="#" onClick={() => {
                setAuthMode('login');
                setShowAuthModal(true);
              }}>Bejelentkezés</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="#" onClick={() => {
                  setAuthMode('register');
                  setShowAuthModal(true);
                }}>Regisztráció</Link>
            </li>
            </Fragment>
            )}
        </ul>
      </div>
    </nav>
      <AuthModal 
      show={showAuthModal} 
      authMode={authMode} 
      setAuthMode={setAuthMode}
      setShow={setShowAuthModal}
      />
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