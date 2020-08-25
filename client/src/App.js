import React, { useEffect } from 'react';
import './App.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setAuthToken, loadUser } from './services/authService';

import Sidebar from './components/sidebar/Sidebar';
import Navigation from './components/navigation/Navigation';

import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import FloatingActionButton from './components/floating-action-button/FloatingActionButton';

import store from './store';
import PrivateRoute from './components/PrivateRoute';
import ChallengeDashboard from './components/challenge-dashboard/ChallengeDashboard';
import Settings from './components/settings/Settings';

function App({ isAuthenticated }) {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App d-flex" id="wrapper">
        <Router>
        { isAuthenticated ? ( <Sidebar /> ) : '' }
        <div id="page-content-wrapper">
        { isAuthenticated ? ( <Navigation />) : '' }
          <div className="container-fluid">
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute exact path="/dashboard/transactions" component={Dashboard} />
                <PrivateRoute exact path="/dashboard/challenges" component={ChallengeDashboard} />
                <PrivateRoute exact path="/settings" component={Settings} />
              </Switch>
              { isAuthenticated ? <FloatingActionButton /> : '' }
          </div>
        </div>
        </Router>
    </div>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(App);
