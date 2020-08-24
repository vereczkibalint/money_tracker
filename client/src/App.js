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

import store from './store';
import PrivateRoute from './components/PrivateRoute';

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
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
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
