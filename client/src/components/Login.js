import React from 'react';
import { TextField, Button, makeStyles, Typography } from '@material-ui/core';

import './Login.css';

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
  return (
    <div className={classes.loginForm}>
      <TextField label="Email cím" type="email" required className={classes.loginInput} />
      <TextField label="Jelszó" type="password" required className={classes.loginInput} />

      <Button variant="contained" color="secondary">Bejelentkezés</Button>
      <a href="#" className={classes.smallText}>Elfelejtett jelszó</a>
      <a href="#" className={classes.smallText}>Nincs még felhasználód?</a>
    </div>
  );
}

export default Login;