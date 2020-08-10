import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Login.css';

import { Link } from 'react-router-dom';

import { login } from '../../actions/auth/auth';
import Error from '../Error';

import { TextField, Button, makeStyles } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    width: 400
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

  const errors = useSelector(state => state.auth.errors);

  const handleLogin = () => {
    if(email.length > 0 && password.length > 0) {
      const credentials = { email, password };
      dispatch(login(credentials));
    }
    return;
  }

  const hasError = (type) => {
    if(errors && errors.length > 0) {
      errors.map(error => {
        if('param' in error && error.param === type) {
          return true;
        }
      });
    }
  }

  const errorText = (type) => {
    const error = hasError(type);
    if(error !== undefined) {
      return error.msg;
    }
    return;
  }

  return (
    <div className={classes.loginForm}>
      {errors && errors.length > 0 && errors.map((error, index) => (
        <Error error={error} key={index} />
      ))}
      <TextField
        label="Email cím"
        type="email"
        error={hasError('email')}
        helperText={errorText('email')}
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