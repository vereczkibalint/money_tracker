import React, { useState, Fragment, useEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';

import './FloatingActionButton.css';

import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faHandHoldingUsd, faTrophy }from '@fortawesome/free-solid-svg-icons';

import ExpenseModal from './expense-modal/ExpenseModal';

const useStyles = makeStyles((theme) => ({
  fabWrapper: {
    position: 'relative',
    height: 150
  },
  speedDial: {
    position: 'fixed',
    '&.MuiSpeedDial-directionUp': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    }
  },
}));

const actions = [
  { icon: <FontAwesomeIcon icon={faMoneyBill} />, name: 'Bevétel', type: 'income' },
  { icon: <FontAwesomeIcon icon={faHandHoldingUsd} />, name: 'Kiadás', type: 'expense' },
  { icon: <FontAwesomeIcon icon={faTrophy} />, name: 'Kihívás', type: 'challenge' },
];

const FloatingActionButton = () => {

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [moneyType, setMoneyType] = useState('');

  const handleModalClose = () => setShowExpenseModal(false);

  const windowSize = useWindowSize();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleMenuClick = (menuType) => {
    switch(menuType) {
      case "income":
        setMoneyType(menuType);
        setShowExpenseModal(true);
        break;
      case "expense":
        setMoneyType(menuType);
        setShowExpenseModal(true);
        break;
      case "challenge":
        setMoneyType(menuType);
        setShowExpenseModal(true);
        break;
      default:
        return;
    }
  }

  useEffect(() => {
    if(windowSize.width < 768) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [windowSize]);

  return (
    <Fragment>
      <div className={classes.fabWrapper}>
        <SpeedDial
          ariaLabel="Műveletek"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="up"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.type}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleMenuClick(action.type)}
            />
          ))}
        </SpeedDial>
      </div>
      { showExpenseModal ? <ExpenseModal modalShow={showExpenseModal} setShowModal={setShowExpenseModal} handleEditModalClose={handleModalClose} modalType={moneyType} /> : '' }
      </Fragment>
  );
}

export default FloatingActionButton;