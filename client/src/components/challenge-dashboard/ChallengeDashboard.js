import React, { Fragment, useEffect } from 'react';
import './ChallengeDashboard.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAllChallenges } from '../../services/challengeService';
import ChallengeCard from '../challenge-card/ChallengeCard';

const ChallengeDasboard = ({ challenges, fetchAllChallenges }) => {
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchAllChallenges();
  }, []);

  return (
    <Fragment>
      <h2 className="text-center mt-3">Kihívások összegzése</h2>
      {challenges && challenges.length > 0 ? challenges.map(challenge => {
          return <ChallengeCard challengeData={challenge} />
      }) : (<h2 className='text-center mt-3'>Nincs megjeleníthető kihívás!</h2>)}
    </Fragment>
  )
}

ChallengeDasboard.propTypes = {
  fetchAllChallenges: PropTypes.func.isRequired,
  challenges: PropTypes.array
};

const mapStateToProps = ({ challenges }) => ({
  challenges: challenges.challenges
});

export default connect(mapStateToProps, { fetchAllChallenges })(ChallengeDasboard);
