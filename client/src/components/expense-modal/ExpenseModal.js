import React, { useState } from 'react';
import moment from 'moment';

import { Modal, Button, Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createExpense } from '../../services/expenseService';

const ExpenseModal = ({ createExpense, expenseErrors, modalShow, modalType, setShowModal, handleEditModalClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [issueDate, setIssueDate] = useState(new Date());
  const [moneyType, setMoneyType] = useState(modalType);
  
  const handleSave = () => {
    if(canSave()) {
      const newExpense = {
        title,
        description,
        amount,
        issueDate,
        moneyType
      };

      createExpense(newExpense);
      if(expenseErrors.length === 0) {
        setShowModal(false);
      }
    }
  }

  const canSave = () => {
    return title.length > 0 && description.length > 0 && amount > 0 && issueDate && (moneyType === 'expense' || moneyType === 'income');
  }

  return (
    <Modal show={modalShow} onHide={handleEditModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tranzakció létrehozása</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="justify-content-center">
        {expenseErrors && expenseErrors.length > 0 && expenseErrors.map((expenseError, errorIndex) => (
          <div className="alert alert-danger" key={errorIndex}>
            {expenseError.msg}
          </div>
        ))}
        <Form.Group controlId="title">
          <Form.Label>Megnevezés</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Leírás</Form.Label>
          <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Érték</Form.Label>
          <Form.Control type="number" min={0} value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="moneyType">
          <Form.Label>Típus</Form.Label>
          <Form.Control as="select" defaultValue={moneyType} onChange={(e) => setMoneyType(e.target.value)}>
            <option value="income">Bevétel</option>
            <option value="expense">Kiadás</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="issueDate">
          <Form.Label>Dátum</Form.Label>
          <Form.Control type="date" value={moment(new Date(issueDate)).format('YYYY-MM-DD')} onChange={(e) => setIssueDate(e.target.value)} />
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditModalClose}>
          Bezár
        </Button>
        <Button variant="primary" onClick={() => handleSave()}>
          Mentés
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ExpenseModal.propTypes = {
  createExpense: PropTypes.func.isRequired,
  expenseErrors: PropTypes.array
};

const mapStateToProps = ({ expenses }) => ({
  expenseErrors: expenses.errors
});

export default connect(mapStateToProps, { createExpense })(ExpenseModal);