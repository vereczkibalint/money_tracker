import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import Sidebar from './components/layout/Sidebar';
import HomePage from './components/HomePage';

import ActionButton from './components/layout/ActionButton';
import Login from './components/Login';
import Register from './components/Register';
import LostPassword from './components/LostPassword';

const App = () => {
  return (
    <div className="App">
      <div className="layout">
        <Sidebar />
        <div className="content">
          { /* <HomePage /> */}
          { /* <ActionButton /> */ }
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/password_recovery" exact component={LostPassword} />
            <Route path="/dashboard" exact component={HomePage} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
