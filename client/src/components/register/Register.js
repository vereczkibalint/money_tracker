import React, { useState } from 'react';
import './Register.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Redirect, Link } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';

import { register } from '../../services/authService';

const Register = ({ register, isAuthenticated, authErrors }) => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if(canRegister()) {
      const userData = { lastName, firstName, email, password, password_confirm: passwordConfirm };
      register(userData);
    }
  }

  const canRegister = () => {
    return lastName.length > 0 && firstName.length > 0 && email.length > 0 && password.length > 0 && passwordConfirm.length > 0 && password === passwordConfirm;
  }

  if(isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="min-vh-100">
        <div className="container">
            <div className="row">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-left form p-4">
                    <h1 className="display-4 py-2 text-black">Regisztráció</h1>
                    { authErrors ? authErrors.map((error, index) => (
                      <div className='alert alert-danger' key={index}>
                        {error.msg}
                      </div>
                    )) : ''}
                    <div className="px-2">
                        <Form action="" className="justify-content-center">
                          <Form.Group controlId="lastName">
                            <Form.Label>Vezetéknév</Form.Label>
                            <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                          </Form.Group>
                          <Form.Group controlId="firstName">
                            <Form.Label>Keresztnév</Form.Label>
                            <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                          </Form.Group>
                          <Form.Group controlId="email">
                            <Form.Label>Email cím</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                          </Form.Group>
                          <Form.Group controlId="password">
                            <Form.Label>Jelszó</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                          </Form.Group>
                          <Form.Group controlId="passwordConfirm">
                            <Form.Label>Jelszó megerősítése</Form.Label>
                            <Form.Control type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                          </Form.Group>
                          <Link to="/login">
                            <p>Van már felhasználód?</p>
                          </Link>
                          <Button variant="primary" type="submit" onClick={(e) => handleRegister(e)}>
                            Regisztráció
                          </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
  </section>
  );
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  authErrors: PropTypes.array
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authErrors: state.auth.errors
});

export default connect(mapStateToProps, { register })(Register);