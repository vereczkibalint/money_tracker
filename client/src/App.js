import React, { useEffect } from 'react';
import './App.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setAuthToken, loadUser } from './services/authService';

import Sidebar from './components/sidebar/Sidebar';
import Navigation from './components/navigation/Navigation';

import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

import store from './store';
import PrivateRoute from './components/PrivateRoute';

function App({ isAuthenticated }) {
  useEffect(() => {
    console.log('app render, loading user...');
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
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
              </Switch>
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
