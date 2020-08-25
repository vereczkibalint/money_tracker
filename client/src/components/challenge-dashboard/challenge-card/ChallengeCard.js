import React, { Fragment } from 'react';
import './ChallengeCard.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import { deleteChallenge } from '../../../services/challengeService';

const ChallengeCard = ({ challengeData, deleteChallenge }) => {

  const handleDelete = (challenge_id) => {
    if(window.confirm('Biztosan törölni szeretnéd?')) {
      deleteChallenge(challenge_id);
    }
  }

  return (
    <Fragment>
      <Card className="m-4 mx-auto moneyCard">
        <Card.Header className="border-0">
          <h4 className="text-black">{challengeData.title}</h4>
          <div className="expense-actions">
            <span className="mr-3" role="button"><FontAwesomeIcon icon={faPlus} style={{color: '#000000'}}/></span>
            <span className="mr-3" role="button"><FontAwesomeIcon icon={faPen} style={{color: '#000000'}}/></span>
            <span role="button"><FontAwesomeIcon icon={faTrash} style={{color: '#000000'}} onClick={() => handleDelete(challengeData._id)}/></span>
          </div>
        </Card.Header>
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
            <span className="text-danger font-weight-bold">Cél: {challengeData.goalAmount},- Ft</span>
            <span className="text-success font-weight-bold">Hátralévő: {challengeData.goalAmount - challengeData.total},- Ft</span>
          </div>
        </Card.Footer>
      </Card>
    </Fragment>
  );
}

ChallengeCard.propTypes = {
  deleteChallenge: PropTypes.func.isRequired
};

export default connect(null, { deleteChallenge })(ChallengeCard);