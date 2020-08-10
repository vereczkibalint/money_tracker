import React from 'react';
import './Register.css';

import { Link } from 'react-router-dom';

import { TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  registerForm: {
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

const Register = () => {
  const classes = useStyles();

  return (
    <div className={classes.registerForm}>
      <TextField
        label="Vezetéknév"
        type="text"
        className={classes.loginInput}
        required />
      <TextField
        label="Keresztnév"
        type="text"
        className={classes.loginInput}
        required />
      <TextField
        label="Email cím"
        type="email"
        className={classes.loginInput}
        required />
      <TextField
        label="Jelszó"
        type="password"
        className={classes.loginInput}
        required />
      <TextField
        label="Jelszó megerősítése"
        type="password"
        className={classes.loginInput}
        required />

      <Button variant="contained" color="secondary">Regisztráció</Button>
      <Link to="/password_recovery" className={classes.smallText}>Elfelejtett jelszó</Link>
      <Link to="/login" className={classes.smallText}>Már van felhasználód? Belépés</Link>
    </div>
  );
}

export default Register;