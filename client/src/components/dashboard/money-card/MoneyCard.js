import React, { Fragment, useState } from 'react';
import './MoneyCard.css';

import { Card } from 'react-bootstrap';
import EditExpenseModal from '../../edit-expense/EditExpenseModal';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { updateExpense, deleteExpense } from '../../../services/expenseService';

const MoneyCard = ({ moneyData, updateExpense, deleteExpense }) => {

  const [showEditModal, setShowEditModal] = useState(false);

  const handleClose = () => setShowEditModal(false);

  const handleDelete = (expense_id) => {
    if(window.confirm('Biztosan törölni szeretnéd?')) {
      deleteExpense(expense_id);
    }
  }

  return (
    <Fragment>
      <Card className="m-4 mx-auto moneyCard">
        <Card.Header className="border-0" style={{background: moneyData.moneyType === 'expense' ? 'linear-gradient(rgba(200, 35, 51, 0.9), rgba(200, 35, 51, 0.8))' : 'linear-gradient(rgba(80, 116, 2, 0.9), rgba(80, 116, 2, 0.8))', }}>
          <h4 className="text-white" style={{textShadow: '1px 1px #000000'}}>{moneyData.title}</h4>
          <div className="expense-actions">
            <span className="mr-3" role="button" onClick={() => setShowEditModal(true)}><FontAwesomeIcon icon={faPen} style={{color: '#FFFFFF'}}/></span>
            <span role="button" onClick={() => handleDelete(moneyData._id)}><FontAwesomeIcon icon={faTrash} style={{color: '#FFFFFF'}}/></span>
          </div>
        </Card.Header>
        <Card.Body>
          {moneyData.description}
        </Card.Body>
        <Card.Footer>
          <div className="expense-info">
            <span className="expense-date font-weight-bold">
            {new Intl.DateTimeFormat('hu-HU', { 
                  month: 'short', 
                  day: '2-digit',
                  year: 'numeric', 
            }).format(new Date(moneyData.issueDate))}
            </span>
          {moneyData.moneyType === 'expense' ? (
            <span className="text-danger font-weight-bold">- {moneyData.amount},- Ft</span>
            ) : (
            <span className="text-success font-weight-bold">+ {moneyData.amount},- Ft</span>
          )}
          </div>
        </Card.Footer>
      </Card>
      { showEditModal ? <EditExpenseModal modalShow={showEditModal} setShowModal={setShowEditModal} expenseId={moneyData._id} handleEditModalClose={handleClose} updateExpense={updateExpense} /> : '' }
    </Fragment>
  );
}

MoneyCard.propTypes = {
  updateExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired
};

export default connect(null, { updateExpense, deleteExpense })(MoneyCard);