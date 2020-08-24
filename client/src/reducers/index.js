import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import expenseReducer from './expenses/expenseReducer';

export default combineReducers({
  auth: authReducer,
  expenses: expenseReducer
});