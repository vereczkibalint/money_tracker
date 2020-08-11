import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';

import './SidebarHeader.css';
import profileImg from '../../assets/images/profile.png';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const SidebarHeader = () => {
    const userObject = localStorage.getItem('user');
    const user = JSON.parse(userObject);

    return (
        <div className="sidebar-header">
            {user !== null ? (
                <Fragment>
                    <div className="user-info">
                        <span className="user-img">
                            <img src={profileImg} alt="profilkép" />
                        </span>
                        <span className="user-welcome">
                            Üdvözlünk, {user.firstName}!
                        </span>
                    </div>
                    <div className="logout">
                        <Link to="/logout">
                            <Button variant="danger" size="sm" className="mb-2">Kilépés</Button>
                        </Link>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <div className="user-info">
                        <span className="user-img">
                            <img src={profileImg} alt="profilkép" />
                        </span>
                    </div>
                    <div className="login">
                        <Link to="/login">
                            <Button variant="danger" size="sm" className="mb-2">Bejelentkezés</Button>
                        </Link>
                    </div>
                </Fragment>
            )}
        </div>
    );
}

export default SidebarHeader;