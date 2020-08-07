import React from 'react';
import './App.css';

import Sidebar from './components/layout/Sidebar';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <div className="App">
      <div className="layout">
        <Sidebar />
        <div className="content">
          <HomePage />
        </div>
      </div>
    </div>
  );
}

export default App;
