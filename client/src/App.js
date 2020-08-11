import React from 'react';
import './App.css';

import { useSelector } from 'react-redux';

import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';

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
        <Router>
          <Sidebar />
          <div className="content">
          <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/password_recovery" exact component={LostPassword} />
              <PrivateRoute path="/" exact component={HomePage} authUser={user} />
            <ActionButton />
          </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
