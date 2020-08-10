import { BEGIN_LOGIN, FAILED_LOGIN, SUCCESSFUL_LOGIN, LOGOUT } from '../actions/authActionTypes';

const authState = {
  currentUser: [],
  isLoading: false,
  error: []
};

export default function auth(state = authState, action) {
  switch(action.type) {
    case BEGIN_LOGIN:
      return {
        ...state,
        isLoading: true
      }
    case FAILED_LOGIN:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    case SUCCESSFUL_LOGIN:
      return {
        ...state,
        currentUser: action.payload.user,
        isLoading: false
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isLoading: false
      };
    default:
      return state;
  }
}