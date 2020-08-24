import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import expenseReducer from './expenses/expenseReducer';
import userReducer from './user/userReducer';

export default combineReducers({
  auth: authReducer,
  expenses: expenseReducer,
  user: userReducer
});