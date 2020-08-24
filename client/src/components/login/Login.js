import React, { useState } from 'react';
import './Login.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Redirect, Link } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';

import { login } from '../../services/authService';

const Login = ({ login, isAuthenticated, authErrors }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if(canLogin()) {
      login(email, password);
    }
  }

  const canLogin = () => {
    return email.length > 0 && password.length > 0;
  }

  if(isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="min-vh-100">
        <div className="container">
            <div className="row">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-left form p-4">
                    <h1 className="display-4 py-2 text-black">Bejelentkezés</h1>
                    { authErrors ? authErrors.map((error, index) => (
                      <div className='alert alert-danger' key={index}>
                        {error.msg}
                      </div>
                    )) : ''}
                    <div className="px-2">
                        <Form className="justify-content-center">
                          <Form.Group controlId="email">
                            <Form.Label>Email cím</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                          </Form.Group>
                          <Form.Group controlId="password">
                            <Form.Label>Jelszó</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                          </Form.Group>
                            <Link to="/register">
                              <p>Nincs még felhasználód?</p>
                            </Link>
                            <Button variant="primary" type="submit" onClick={(e) => handleLogin(e)}>
                              Belépés
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
  </section>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  authErrors: PropTypes.array
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authErrors: state.auth.errors
});

export default connect(mapStateToProps, { login })(Login);