import React from 'react';
import './App.css';

import Sidebar from './components/layout/Sidebar';
import HomePage from './components/HomePage';

import ActionButton from './components/layout/ActionButton';
import Login from './components/Login';

const App = () => {
  return (
    <div className="App">
      <div className="layout">
        <Sidebar />
        <div className="content">
          { /* <HomePage /> */}
          { /* <ActionButton /> */ }
          <Login />
        </div>
      </div>
    </div>
  );
}

export default App;
