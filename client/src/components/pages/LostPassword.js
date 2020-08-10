import React from 'react';
import './LostPassword.css';

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

const LostPassword = () => {
  const classes = useStyles();

  return (
    <div className={classes.registerForm}>
      <TextField
        label="Regisztrált email cím"
        type="email"
        className={classes.loginInput}
        required />

      <Button variant="contained" color="secondary">Küldés</Button>
      <Link to="/login" className={classes.smallText}>Már van felhasználód? Belépés</Link>
    </div>
  );
}

export default LostPassword;