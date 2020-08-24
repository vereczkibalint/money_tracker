import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { login } from  '../../services/authService';
import { register } from '../../services/userService';

import { Modal, Button, Form } from 'react-bootstrap';

const AuthModal = ({ login, register, isAuthenticated, authErrors, registerErrors, show, authMode, setShow, setAuthMode }) => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if(canLogin()) {
      login(email, password);
    }
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if(canRegister()) {
      const userData = {
        firstName, lastName, email, password, password_confirm: passwordConfirm
      };
      
      register(userData);
    }
  }

  const canLogin = () => {
    return email.length > 0 && password.length > 0;
  }

  const canRegister = () => {
    return firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0 && passwordConfirm.length > 0 && password === passwordConfirm;
  }

  if(isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Modal
      show={show}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        setShow(false);
        setAuthMode('login');
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          { authMode === 'login' ? 'Bejelentkezés' : 'Regisztráció' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      { authErrors ? authErrors.map((error, index) => (
        <div className='alert alert-danger' key={index}>
          {error.msg}
        </div>
      )) : ''}
      { registerErrors ? registerErrors.map((error, index) => (
        <div className='alert alert-danger' key={index}>
          {error.msg}
        </div>
      )) : ''}
      { authMode === 'login' ? (
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email cím</Form.Label>
              <Form.Control type="email" placeholder="Email cím" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Jelszó</Form.Label>
              <Form.Control type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <p className="text-primary" role="button" onClick={() => setAuthMode('register')}>Még nincs felhasználód?</p>
            <Button variant="primary" type="submit" onClick={(e) => handleLogin(e)}>
              Belépés
            </Button>
          </Form>
      ) : (
        <Form>
          <Form.Group controlId="lastName">
            <Form.Label>Vezetéknév</Form.Label>
            <Form.Control type="text" placeholder="Vezetéknév" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="firstName">
            <Form.Label>Keresztnév</Form.Label>
            <Form.Control type="text" placeholder="Keresztnév" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email cím</Form.Label>
            <Form.Control type="email" placeholder="Email cím" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Jelszó megerősítése</Form.Label>
            <Form.Control type="password" placeholder="Jelszó megerősítése" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
          </Form.Group>

          <p className="text-primary" role="button" onClick={() => setAuthMode('login')}>Van már felhasználód?</p>
          <Button variant="primary" type="submit" onClick={(e) => handleRegister(e)}>
            Regisztráció
          </Button>
        </Form>
      )}
      </Modal.Body>
    </Modal>
  );
}

AuthModal.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  authErrors: PropTypes.array,
  registerErrors: PropTypes.array
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authErrors: state.auth.errors,
  registerErrors: state.user.errors
});

export default connect(mapStateToProps, { login, register })(AuthModal);