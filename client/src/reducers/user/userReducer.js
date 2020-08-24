import { REGISTER_SUCCESSFUL, REGISTER_FAILED } from '../../actions/user/userActionTypes';

const initialState = {
  errors: [],
  registerSuccessful: false
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case REGISTER_SUCCESSFUL:
      return {
        ...state,
        registerSuccessful: true
      }
    case REGISTER_FAILED:
      return {
        ...state,
        registerSuccessful: false,
        errors: payload.errors
      }
    default:
      return state;
  }
}

export default userReducer;