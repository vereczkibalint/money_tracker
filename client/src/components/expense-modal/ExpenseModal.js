import React, { Fragment, useState } from 'react';
import moment from 'moment';

import { Modal, Button, Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createExpense } from '../../services/expenseService';

const ExpenseModal = ({ createExpense, expenseErrors, modalShow, modalType, setShowModal, handleEditModalClose }) => {
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseIssueDate, setExpenseIssueDate] = useState(new Date());
  const [expenseMoneyType, setExpenseMoneyType] = useState(modalType);

  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeDescription, setChallengeDescription] = useState('');
  const [challengeGoalAmount, setChallengeGoalAmount] = useState(0);
  const [challengeDeadline, setChallengeDeadline] = useState(new Date());
  
  const handleSave = () => {
    if(canSave()) {
      const newExpense = {
        title: expenseTitle,
        description: expenseDescription,
        amount: expenseAmount,
        issueDate: expenseIssueDate,
        moneyType: expenseMoneyType
      };

      createExpense(newExpense);
      if(expenseErrors.length === 0) {
        setShowModal(false);
      }
    }
  }

  const handleCreate = () => {
    console.log('challenge create')
  }

  const canSave = () => {
    return expenseTitle.length > 0 && expenseDescription.length > 0 && expenseAmount > 0 && expenseIssueDate && (expenseMoneyType === 'expense' || expenseMoneyType === 'income');
  }

  return (
    <Modal show={modalShow} onHide={handleEditModalClose}>
      <Modal.Header closeButton>
        {expenseMoneyType === 'income' || expenseMoneyType === 'expense' ? (
          <Modal.Title>Tranzakció létrehozása</Modal.Title>
        ) : (
          <Modal.Title>Kihívás létrehozása</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        {expenseMoneyType === 'income' || expenseMoneyType === 'expense' ? (
          <Form className="justify-content-center">
          {expenseErrors && expenseErrors.length > 0 && expenseErrors.map((expenseError, errorIndex) => (
            <div className="alert alert-danger" key={errorIndex}>
              {expenseError.msg}
            </div>
          ))}
          <Form.Group controlId="title">
            <Form.Label>Megnevezés</Form.Label>
            <Form.Control type="text" value={expenseTitle} onChange={(e) => setExpenseTitle(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Leírás</Form.Label>
            <Form.Control type="text" value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="amount">
            <Form.Label>Érték</Form.Label>
            <Form.Control type="number" min={0} value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="moneyType">
            <Form.Label>Típus</Form.Label>
            <Form.Control as="select" defaultValue={expenseMoneyType} onChange={(e) => setExpenseMoneyType(e.target.value)}>
              <option value="income">Bevétel</option>
              <option value="expense">Kiadás</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="issueDate">
            <Form.Label>Dátum</Form.Label>
            <Form.Control type="date" value={moment(new Date(expenseIssueDate)).format('YYYY-MM-DD')} onChange={(e) => setExpenseIssueDate(e.target.value)} />
          </Form.Group>
        </Form>
        ) : (
          <Form className="justify-content-center">
          {expenseErrors && expenseErrors.length > 0 && expenseErrors.map((expenseError, errorIndex) => (
            <div className="alert alert-danger" key={errorIndex}>
              {expenseError.msg}
            </div>
          ))}
          <Form.Group controlId="title">
            <Form.Label>Megnevezés</Form.Label>
            <Form.Control type="text" value={challengeTitle} onChange={(e) => setChallengeTitle(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Leírás</Form.Label>
            <Form.Control type="text" value={challengeDescription} onChange={(e) => setChallengeDescription(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="amount">
            <Form.Label>Cél összeg</Form.Label>
            <Form.Control type="number" min={0} value={challengeGoalAmount} onChange={(e) => setChallengeGoalAmount(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="issueDate">
            <Form.Label>Határidő</Form.Label>
            <Form.Control type="date" min={new Date().toISOString().split("T")[0]} onKeyDown={(e) => e.preventDefault()} value={moment(new Date(challengeDeadline)).format('YYYY-MM-DD')} onChange={(e) => setChallengeDeadline(e.target.value)} />
          </Form.Group>
        </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {expenseMoneyType === 'income' || expenseMoneyType === 'expense' ? (
          <Fragment>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Bezár
            </Button>
            <Button variant="primary" onClick={() => handleSave()}>
              Mentés
            </Button>
          </Fragment>
        ): (
          <Fragment>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Bezár
            </Button>
            <Button variant="primary" onClick={() => handleCreate()}>
              Lérehozás
            </Button>
          </Fragment>
        )}
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