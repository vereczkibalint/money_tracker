import React, { Fragment } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import profileImg from '../../assets/images/profile.png';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from  '../../services/authService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faCreditCard, faTrophy, faCog, faCaretRight }from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ logout, user }) => {

  return (
    <Fragment>
      <div id="sidebar-wrapper">
        <div className="sidebar-heading">
              <div className="user-info">
                  <span className="user-img">
                    <img src={profileImg} className="sidebarAvatar" alt="profilkép" />
                  </span>
                  <span className="user-welcome">
                    Üdvözlünk, {user.firstName}!
                  </span>
                  <div className="logout">
                    <Button variant="danger" size="sm" onClick={() => logout()}>Kilépés</Button>
                  </div>
              </div>
        </div>
        <div className="list-group list-group-flush">
          { /* <Link to="#" className="list-group-item list-group-item-action">
            <div className="d-flex">
              <div className="p-2 menu-icon"><FontAwesomeIcon icon={faWallet} /></div>
              <div className="p-2"><span className="menu-text">Bevételek</span></div>
              <div className="ml-auto p-2 menu-icon"><FontAwesomeIcon icon={faCaretRight} /></div>
            </div>
          </Link>
          <Link to="#" className="list-group-item list-group-item-action">
            <div className="d-flex">
              <div className="p-2 menu-icon"><FontAwesomeIcon icon={faCreditCard} /></div>
              <div className="p-2"><span className="menu-text">Kiadások</span></div>
              <div className="ml-auto p-2 menu-icon"><FontAwesomeIcon icon={faCaretRight} /></div>
            </div>
          </Link> */ }
          <Link to="#" className="list-group-item list-group-item-action">
            <div className="d-flex">
              <div className="p-2 menu-icon"><FontAwesomeIcon icon={faTrophy} style={{fontSize: '24px'}}/></div>
              <div className="p-2"><span className="menu-text">Kihívások</span></div>
              <div className="ml-auto p-2 menu-icon"><FontAwesomeIcon icon={faCaretRight} style={{fontSize: '24px'}}/></div>
            </div>
          </Link>
          <Link to="#" className="list-group-item list-group-item-action">
            <div className="d-flex">
              <div className="p-2 menu-icon"><FontAwesomeIcon icon={faCog} style={{fontSize: '24px'}}/></div>
              <div className="p-2"><span className="menu-text">Beállítások</span></div>
              <div className="ml-auto p-2 menu-icon"><FontAwesomeIcon icon={faCaretRight} style={{fontSize: '24px'}}/></div>
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Sidebar);
