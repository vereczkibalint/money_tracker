import { 
  CHALLENGES_FETCHED,
  CHALLENGE_FETCH_FAILED,
  CHALLENGE_CREATED,
  CHALLENGE_CREATE_FAILED,
  CHALLENGE_UPDATED,
  CHALLENGE_UPDATE_FAILED,
  CHALLENGE_DELETED,
  CHALLENGE_DELETE_FAILED
} from './challengeActionTypes';

export const challengeFetched = (challenges) => {
  return {
    type: CHALLENGES_FETCHED,
    payload: {
      challenges
    }
  }
}

export const challengeFetchFailed = (errors) => {
  return {
    type: CHALLENGE_FETCH_FAILED,
    payload: {
      errors
    }
  }
}

export const challengeCreated = (challenge) => {
  return {
    type: CHALLENGE_CREATED,
    payload: {
      challenge
    }
  }
}

export const challengeCreateFailed = (errors) => {
  return {
    type: CHALLENGE_CREATE_FAILED,
    payload: {
      errors
    }
  }
}

export const challengeUpdated = (challenge) => {
  return {
    type: CHALLENGE_UPDATED,
    payload: {
      challenge
    }
  }
}

export const challengeUpdateFailed = (errors) => {
  return {
    type: CHALLENGE_UPDATE_FAILED,
    payload: {
      errors
    }
  }
}

export const challengeDeleted = (challenge_id) => {
  return {
    type: CHALLENGE_DELETED,
    payload: {
      challenge_id
    }
  }
}

export const challengeDeleteFailed = (errors) => {
  return {
    type: CHALLENGE_DELETE_FAILED,
    payload: {
      errors
    }
  }
}