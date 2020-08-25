import api from '../utils/api';

import {
  challengeFetched,
  challengeFetchFailed,
  challengeCreated,
  challengeCreateFailed,
  challengeUpdated,
  challengeUpdateFailed,
  challengeDeleted,
  challengeDeleteFailed
} from '../actions/challenges/challengeActions';

const API_PATH = '/challenges';

export const fetchAllChallenges = () => {
  return (dispatch) => {
    api.get(API_PATH).then(response => {
      dispatch(challengeFetched(response.data));
    }).catch(err => {
      const { errors } = err.response.data;
      dispatch(challengeFetchFailed(errors));
    })
  }
}

export const createChallenge = (challenge) => {
  return (dispatch) => {
    api.post(API_PATH, challenge).then(response => {
      dispatch(challengeCreated(response.data));
    }).catch(err => {
      const { errors } = err.response.data;
      dispatch(challengeCreateFailed(errors));
    })
  }
}

export const updateChallenge = (challenge) => {
  return (dispatch) => {
    api.put(API_PATH+`/${challenge._id}`, challenge).then(response => {
      dispatch(challengeUpdated(response.data));
    }).catch(err => {
      const { errors } = err.response.data;
      dispatch(challengeUpdateFailed(errors));
    })
  }
}

export const updateChallengeSaving = (challengeData) => {
  return (dispatch) => {
    api.put(API_PATH+'/saving/'+challengeData._id, {
      savingAmount: challengeData.savingAmount
    }).then(response => {
      dispatch(challengeUpdated(response.data));
    }).catch(err => {
      const { errors } = err.response.data;
      dispatch(challengeUpdateFailed(errors));
    })
  }
}

export const deleteChallenge = (challenge_id) => {
  return (dispatch) => {
    api.delete(API_PATH + `/${challenge_id}`).then(response => {
      dispatch(challengeDeleted(challenge_id));
    }).catch(err => {
      const { errors } = err.response.data;
      dispatch(challengeDeleteFailed(errors));
    })
  }
}