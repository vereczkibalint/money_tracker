import { EXPENSES_FETCHED, EXPENSE_FETCH_FAILED, EXPENSE_FILTER_BY_SEARCHTERM } from './expensesActionTypes';

export const expenseFetched = (expenses) => {
  return {
    type: EXPENSES_FETCHED,
    payload: {
      expenses
    }
  }
}

export const expenseFetchFailed = (errors) => {
  return {
    type: EXPENSE_FETCH_FAILED,
    payload: {
      errors
    }
  }
}

export const expenseFilterBySearchTerm = (searchTerm) => {
  return {
    type: EXPENSE_FILTER_BY_SEARCHTERM,
    payload: {
      searchTerm
    }
  }
}