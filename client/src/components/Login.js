import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Login.css';

import { Link } from 'react-router-dom';

import axios from 'axios';
import { beginLogin, loginSuccessful, loginFailed } from '../actions/auth/auth';

import { TextField, Button, makeStyles } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    width: 300
  },
  loginInput: {
    marginBottom: 20
  },
  smallText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10
  }
}));

const Login = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleLogin = () => {
    dispatch(beginLogin());
    if(email.length > 0 && password.length > 0) {
      axios.post('api/auth', {
        email, password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        dispatch(loginSuccessful(res.data.token))
      }).catch(err => {
        if(err.response.data.message) {
          dispatch(loginFailed(err.response.data.message));
        } else {
          dispatch(loginFailed(err.response.data.errors.errors));
        }
      });
    }
    return;
  }

  return (
    <div className={classes.loginForm}>
      <TextField
        label="Email cím"
        type="email"
        className={classes.loginInput}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required />
      <TextField
        label="Jelszó"
        type="password"
        className={classes.loginInput}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required />

      <Button variant="contained" color="secondary" onClick={() => handleLogin()}>Bejelentkezés</Button>
      <Link to="/password_recovery" className={classes.smallText}>Elfelejtett jelszó</Link>
      <Link to="/register" className={classes.smallText}>Nincs még felhasználód?</Link>
    </div>
  );
}

export default Login;