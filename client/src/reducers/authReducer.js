import { BEGIN_LOGIN, LOGIN_SUCCESSFUL, LOGIN_FAILED, LOGOUT } from '../actions/auth/types';

const authState = {
  isLoading: false,
  errors: [],
  user: {},
  token: {}
};

export default function auth(state = authState, action) {
  switch(action.type) {
    case BEGIN_LOGIN:
      return {
        ...state,
        isLoading: true,
        errors: []
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors
      };
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token
      };
    case LOGOUT:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}