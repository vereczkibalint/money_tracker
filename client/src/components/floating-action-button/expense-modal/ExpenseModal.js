import React, { Fragment, useState } from 'react';
import moment from 'moment';

import { Modal, Button, Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createExpense } from '../../../services/expenseService';
import { createChallenge } from '../../../services/challengeService';

const ExpenseModal = ({ createExpense, createChallenge, challengeErrors, expenseErrors, modalShow, modalType, setShowModal, handleEditModalClose }) => {

  const today = new Date();
  const deadlineMin = moment(today).add(1, 'day');

  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseIssueDate, setExpenseIssueDate] = useState(new Date());
  const [expenseMoneyType, setExpenseMoneyType] = useState(modalType);

  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeDescription, setChallengeDescription] = useState('');
  const [challengeGoalAmount, setChallengeGoalAmount] = useState(0);
  const [challengeDeadline, setChallengeDeadline] = useState(deadlineMin);
  
  const handleEditSave = () => {
    if(verifyEdit()) {
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

  const handleCreateSave = () => {
    if(verifyChallengeCreate()) {
      const newChallenge = {
        title: challengeTitle,
        description: challengeDescription,
        goalAmount: challengeGoalAmount,
        deadline: challengeDeadline
      };

      createChallenge(newChallenge);
      if(challengeErrors.length === 0) {
        setShowModal(false);
      }
    }
  }

  const verifyEdit = () => {
    return expenseTitle.length > 0 && expenseDescription.length > 0 && expenseAmount > 0 && expenseIssueDate && (expenseMoneyType === 'expense' || expenseMoneyType === 'income');
  }

  const verifyChallengeCreate = () => {
    return challengeTitle.length > 0 && challengeDescription.length > 0 && challengeGoalAmount > 0 && (new Date(challengeDeadline) > new Date());
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
            <Form.Control type="date" onKeyDown={(e) => e.preventDefault()} value={moment(new Date(expenseIssueDate)).format('YYYY-MM-DD')} onChange={(e) => setExpenseIssueDate(e.target.value)} />
          </Form.Group>
        </Form>
        ) : (
          <Form className="justify-content-center">
          {challengeErrors && challengeErrors.length > 0 && challengeErrors.map((challengeError, errorIndex) => (
            <div className="alert alert-danger" key={errorIndex}>
              {challengeError.msg}
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
            <Form.Control type="date" min={deadlineMin.toISOString().split("T")[0]} onKeyDown={(e) => e.preventDefault()} value={moment(new Date(challengeDeadline)).format('YYYY-MM-DD')} onChange={(e) => setChallengeDeadline(e.target.value)} />
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
            <Button variant="primary" onClick={() => handleEditSave()}>
              Mentés
            </Button>
          </Fragment>
        ): (
          <Fragment>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Bezár
            </Button>
            <Button variant="primary" onClick={() => handleCreateSave()}>
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
  createChallenge: PropTypes.func.isRequired,
  expenseErrors: PropTypes.array,
  challengeErrors: PropTypes.array
};

const mapStateToProps = ({ expenses, challenges }) => ({
  expenseErrors: expenses.errors,
  challengeErrors: challenges.errors
});

export default connect(mapStateToProps, { createExpense, createChallenge })(ExpenseModal);