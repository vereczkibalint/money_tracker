import React, { useState } from 'react';

import './SidebarHeader.css';
import profileImg from '../../assets/images/profile.png';

const SidebarHeader = () => {
    const [username, setUsername] = useState('Teszt');

    return (
        <div className="sidebar-header">
            <div className="user-info">
                <span className="user-img">
                    <img src={profileImg} alt="profilkép" />
                </span>
                <span className="user-welcome">
                    Üdvözlünk, {username}!
                </span>
            </div>
            <div className="logout">
                <button type="button" className="btn-logout">Kilépés</button>
            </div>
        </div> 
    );
}

export default SidebarHeader;