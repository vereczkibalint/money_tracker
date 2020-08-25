import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import expenseReducer from './expenses/expenseReducer';
import challengeReducer from './challenges/challengeReducer';

const appReducer = combineReducers({
  auth: authReducer,
  expenses: expenseReducer,
  challenges: challengeReducer
});

export default function (state, action) {
  if (action.type === 'AUTH_LOGOUT') {
    state = {}
  }

  return appReducer(state, action)
}