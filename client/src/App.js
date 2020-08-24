import React, { useEffect } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setAuthToken, loadUser } from './services/authService';

import Sidebar from './components/sidebar/Sidebar';
import Navigation from './components/navigation/Navigation';

import LandingPage from './components/landing-page/LandingPage';
import Dashboard from './components/dashboard/Dashboard';

import store from './store';
import PrivateRoute from './components/PrivateRoute';

function App() {
  
  useEffect(() => {
    console.log('app render, loading user...');
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App d-flex" id="wrapper">
        <Router>
        <Sidebar />
        <div id="page-content-wrapper">
        <Navigation />
          <div className="container-fluid">
              <Switch>
                <Route path="/" exact component={LandingPage} />
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
              </Switch>
          </div>
        </div>
        </Router>
    </div>
  );
}

export default App;
