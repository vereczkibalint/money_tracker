import React from 'react';
import { Fab } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(10)
  },
  icon: {
    fontSize: 16
  }
}));

const ActionButton = () => {
  const classes = useStyles();

  return (
    <Fab color="secondary" aria-label="add" className={classes.fab}>
      <FontAwesomeIcon icon={faPlus} className={classes.icon} />
    </Fab>
  );
}

export default ActionButton;