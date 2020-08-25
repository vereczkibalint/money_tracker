import React, { Fragment } from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import profileImg from '../../assets/images/profile.png';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from  '../../services/authService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faCog, faCaretRight, faListAlt, faExchangeAlt }from '@fortawesome/free-solid-svg-icons';

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
                    <Button variant="danger" size="sm" onClick={() => logout()}>
                      Kilépés
                    </Button>
                  </div>
              </div>
        </div>
        <div className="list-group list-group-flush">
          <NavLink to="/dashboard/transactions" className="list-group-item list-group-item-action" activeClassName="menu-active">
            <div className="d-flex">
              <div className="p-2 menu-icon">
                <FontAwesomeIcon icon={faExchangeAlt} style={{fontSize: '24px'}}/>
              </div>
              <div className="p-2">
                <span className="menu-text">Tranzakciók</span>
              </div>
              <div className="ml-auto p-2 menu-icon">
                <FontAwesomeIcon icon={faCaretRight} />
              </div>
            </div>
          </NavLink>
          <NavLink to="/dashboard/challenges" className="list-group-item list-group-item-action" activeClassName="menu-active">
            <div className="d-flex">
              <div className="p-2 menu-icon">
                <FontAwesomeIcon icon={faTrophy} style={{fontSize: '24px'}}/>
              </div>
              <div className="p-2">
                <span className="menu-text">Kihívások</span>
              </div>
              <div className="ml-auto p-2 menu-icon">
                <FontAwesomeIcon icon={faCaretRight} style={{fontSize: '24px'}}/>
              </div>
            </div>
          </NavLink>
          <NavLink to="/settings" className="list-group-item list-group-item-action" activeClassName="menu-active">
            <div className="d-flex">
              <div className="p-2 menu-icon">
                <FontAwesomeIcon icon={faCog} style={{fontSize: '24px'}}/>
              </div>
              <div className="p-2">
                <span className="menu-text">Beállítások</span>
              </div>
              <div className="ml-auto p-2 menu-icon">
                <FontAwesomeIcon icon={faCaretRight} style={{fontSize: '24px'}}/>
              </div>
            </div>
          </NavLink>
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
