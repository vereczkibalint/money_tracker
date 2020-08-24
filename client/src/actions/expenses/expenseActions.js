import { EXPENSES_FETCHED, EXPENSE_FETCH_FAILED } from './expensesActionTypes';

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