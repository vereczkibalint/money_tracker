import { 
  CHALLENGES_FETCHED,
  CHALLENGE_FETCH_FAILED,
  CHALLENGE_CREATED,
  CHALLENGE_CREATE_FAILED,
  CHALLENGE_UPDATED,
  CHALLENGE_UPDATE_FAILED,
  CHALLENGE_DELETED,
  CHALLENGE_DELETE_FAILED
} from '../../actions/challenges/challengeActionTypes';

const initialState = {
  challenges: [],
  errors: []
};

const challengeReducer = (state = initialState, action) => {
  const { type, payload } = action; 
  switch(type) {
    case CHALLENGES_FETCHED:
      return {
        ...state,
        challenges: payload.challenges
      }
    case CHALLENGE_FETCH_FAILED:
      return {
        ...state,
        errors: payload.errors
      }
    case CHALLENGE_CREATED:
      return {
        ...state,
        errors: [],
        challenges: [...state.challenges, payload.challenge]
      }
    case CHALLENGE_CREATE_FAILED: {
      return {
        ...state,
        errors: payload.errors
      }
    }
    case CHALLENGE_UPDATED:
      return {
        ...state,
        challenges: state.challenges.map(challenge => {
          if(challenge._id === payload.challenge._id) {
            return payload.challenge;
          }

          return challenge;
        })
      }
    case CHALLENGE_UPDATE_FAILED:
      return {
        ...state,
        errors: payload.errors
      }
    case CHALLENGE_DELETED: 
      return {
        ...state,
        challenges: state.challenges.filter(challenge => challenge._id !== payload.challenge_id)
      }
    case CHALLENGE_DELETE_FAILED: 
      return {
        ...state,
        errors: payload.errors
      }
    default:
      return state;
  }
}

export default challengeReducer;