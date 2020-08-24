import { EXPENSES_FETCHED, EXPENSE_FETCH_FAILED } from '../../actions/expenses/expensesActionTypes';

const initialState = {
  expenses: [],
  errors: []
};

const expenseReducer = (state = initialState, action) => {
  const { type, payload } = action; 
  switch(type) {
    case EXPENSES_FETCHED:
      return {
        ...state,
        expenses: payload.expenses
      }
    case EXPENSE_FETCH_FAILED:
      return {
        ...state,
        errors: payload.errors
      }
    default:
      return state;
  }
}

export default expenseReducer;