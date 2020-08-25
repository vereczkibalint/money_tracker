import React, { Fragment } from 'react';
import './ChallengeCard.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import { updateChallengeSaving, deleteChallenge } from '../../../services/challengeService';

const ChallengeCard = ({ challengeData, challengeErrors, updateChallengeSaving, deleteChallenge }) => {

  const handleDelete = (challengeId) => {
    if(window.confirm('Biztosan törölni szeretnéd?')) {
      deleteChallenge(challengeId);
    }
  }

  const handleSavingChange = (challengeId) => {
    const savingAmount = window.prompt("Félretett pénz (Ft):", 0);

    if(savingAmount <= 0 || isNaN(savingAmount)) return;
    
    const challengeData = {
      _id: challengeId,
      savingAmount
    };
    updateChallengeSaving(challengeData);
  }

  return (
    <Fragment>
      {
      challengeErrors && challengeErrors.length > 0 && challengeErrors.map((challengeError, errorIndex) => (
          <div className="alert alert-danger" key={errorIndex}>
            {challengeError.msg}
          </div>
      ))}
      <Card className="m-4 mx-auto moneyCard">
        {challengeData.completed ? (
          <Card.Header 
          className="border-0"
          style={{ background: 'linear-gradient(rgba(80, 116, 2, 0.9), rgba(80, 116, 2, 0.8))', color: '#FFFFFF'}}>
          <h4 className='text-white'
            style={{textShadow: '1px 1px #000000'}}>
              {challengeData.title}
          </h4>
          <div className="expense-actions">
            <span role="button">
              <FontAwesomeIcon icon={faTrash} style={{color: '#FFFFFF'}} onClick={() => handleDelete(challengeData._id)}/>
            </span>
          </div>
        </Card.Header>
        ) : (
        <Card.Header 
          className="border-0"
          style={{ color: '#FFFFFF', background: 'linear-gradient(rgba(200, 35, 51, 0.9), rgba(200, 35, 51, 0.8))'}}>
          <h4 className='text-black'
            style={{textShadow: '1px 1px #000000'}}>
              {challengeData.title}
          </h4>
          <div className="expense-actions">
            {new Date(challengeData.deadline) > new Date() && (
              <Fragment>
                <span className="mr-3" role="button">
                  <FontAwesomeIcon icon={faPlus} style={{color: '#FFFFFF'}} onClick={() => handleSavingChange(challengeData._id)} />
                </span>
                <span className="mr-3" role="button">
                  <FontAwesomeIcon icon={faPen} style={{color: '#FFFFFF'}} />
                </span>
              </Fragment>
            )}
            <span role="button">
              <FontAwesomeIcon icon={faTrash} style={{color: '#FFFFFF'}} onClick={() => handleDelete(challengeData._id)}/>
            </span>
          </div>
        </Card.Header>
        )}
        <Card.Body>
          {challengeData.description}
        </Card.Body>
        <Card.Footer>
          <div className="expense-info">
            <span className="expense-date font-weight-bold">
            Határidő: {new Intl.DateTimeFormat('hu-HU', { 
                  month: 'short', 
                  day: '2-digit',
                  year: 'numeric', 
            }).format(new Date(challengeData.deadline))}
            </span>
            <span className="text-danger font-weight-bold">
              Cél: {challengeData.goalAmount},- Ft
            </span>
            <span className="text-success font-weight-bold">
              Hátralévő: {challengeData.goalAmount - challengeData.total},- Ft
            </span>
          </div>
        </Card.Footer>
      </Card>
    </Fragment>
  );
}

ChallengeCard.propTypes = {
  updateChallengeSaving: PropTypes.func.isRequired,
  deleteChallenge: PropTypes.func.isRequired
};

const mapStateToProps = ({ challenges }) => ({
  challengeErrors: challenges.errors
});

export default connect(mapStateToProps, { updateChallengeSaving, deleteChallenge })(ChallengeCard);