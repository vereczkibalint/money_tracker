import { EXPENSES_FETCHED, EXPENSE_FETCH_FAILED, EXPENSE_UPDATED, EXPENSE_UPDATE_FAILED, EXPENSE_DELETED, EXPENSE_DELETE_FAILED, EXPENSE_FILTER_BY_SEARCHTERM } from '../../actions/expenses/expensesActionTypes';

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
    case EXPENSE_UPDATED:
      return {
        ...state,
        expenses: state.expenses.map(expense => {
          if(expense._id === payload.expense._id) {
            return payload.expense;
          }

          return expense;
        })
      }
    case EXPENSE_UPDATE_FAILED:
      return {
        ...state,
        errors: payload.errors
      }
    case EXPENSE_DELETED: 
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense._id !== payload.expense_id)
      }
    case EXPENSE_DELETE_FAILED: 
      return {
        ...state,
        errors: payload.errors
      }
    case EXPENSE_FILTER_BY_SEARCHTERM:
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.title.toLowerCase().includes(payload.searchTerm.toLowerCase()) || expense.description.toLowerCase().includes(payload.searchTerm.toLowerCase()))
      }
    default:
      return state;
  }
}

export default expenseReducer;