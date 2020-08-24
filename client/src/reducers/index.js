import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import expenseReducer from './expenses/expenseReducer';

const appReducer = combineReducers({
  auth: authReducer,
  expenses: expenseReducer
});

export default function (state, action) {
  if (action.type === 'AUTH_LOGOUT') {
    state = {}
  }

  return appReducer(state, action)
}