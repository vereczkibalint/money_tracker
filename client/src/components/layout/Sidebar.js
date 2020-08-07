import React from 'react';

import './Sidebar.css';
import SidebarHeader from './SidebarHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faWallet, faCreditCard, faTrophy, faCog, faCaretRight }from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    return (
    <div className="sidebar">
        <SidebarHeader />
        <div className="menu">
            <ul>
                <li className="menu-item active">
                    <FontAwesomeIcon icon={faWallet} style={{marginLeft: 10, marginRight: 15, fontSize: 22, verticalAlign: 'middle', color: '#393F00' }}/>
                    <span className="menu-text">Bevételek</span>
                    <FontAwesomeIcon icon={faCaretRight} style={{float: "right", fontSize: 20, marginTop: 7, marginRight: 10, color: '#393F00' }} />
                </li>
                <li className="menu-item">
                    <FontAwesomeIcon icon={faCreditCard} style={{marginLeft: 10, marginRight: 15, fontSize: 22, verticalAlign: 'middle', color: '#393F00' }}/>
                    <span className="menu-text">Kiadások</span>
                    <FontAwesomeIcon icon={faCaretRight} style={{float: "right", fontSize: 20, marginTop: 7, marginRight: 10, color: '#393F00' }} />
                </li>
                <li className="menu-item">
                    <FontAwesomeIcon icon={faTrophy} style={{marginLeft: 10, marginRight: 15, fontSize: 22, verticalAlign: 'middle', color: '#393F00' }}/>
                    <span className="menu-text">Kihívások</span>
                    <FontAwesomeIcon icon={faCaretRight} style={{float: "right", fontSize: 20, marginTop: 7, marginRight: 10, color: '#393F00' }} />
                </li>
            </ul>
        </div>
        <div className="menu menu-bottom">
            <ul>
                <li className="menu-item">
                    <FontAwesomeIcon icon={faCog} style={{marginLeft: 10, marginRight: 15, fontSize: 22, verticalAlign: 'middle', color: '#393F00' }}/>
                    <span className="menu-text">Beállítások</span>
                    <FontAwesomeIcon icon={faCaretRight} style={{float: "right", fontSize: 20, marginTop: 7, marginRight: 10, color: '#393F00' }} />
                </li>
            </ul>
        </div>
    </div>
    );
}

export default Sidebar;