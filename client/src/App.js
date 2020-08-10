import React from 'react';
import './App.css';

import { useSelector } from 'react-redux';

import { Switch, Route } from 'react-router-dom';

import Sidebar from './components/layout/Sidebar';
import HomePage from './components/pages/HomePage';

import PrivateRoute from './components/PrivateRoute';

import ActionButton from './components/layout/ActionButton';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import LostPassword from './components/pages/LostPassword';

const App = () => {
  const user = useSelector(state => state.auth.currentUser);

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
            <PrivateRoute path="/dashboard" exact component={HomePage} authUser={user} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
