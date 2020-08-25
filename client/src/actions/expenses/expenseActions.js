import { EXPENSES_FETCHED, EXPENSE_FETCH_FAILED, EXPENSE_CREATED, EXPENSE_CREATE_FAILED, EXPENSE_UPDATED, EXPENSE_UPDATE_FAILED, EXPENSE_DELETED, EXPENSE_DELETE_FAILED, EXPENSE_FILTER_BY_SEARCHTERM } from './expensesActionTypes';

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

export const expenseCreated = (expense) => {
  return {
    type: EXPENSE_CREATED,
    payload: {
      expense
    }
  }
}

export const expenseCreateFailed = (errors) => {
  return {
    type: EXPENSE_CREATE_FAILED,
    payload: {
      errors
    }
  }
}

export const expenseUpdated = (expense) => {
  return {
    type: EXPENSE_UPDATED,
    payload: {
      expense
    }
  }
}

export const expenseUpdateFailed = (errors) => {
  return {
    type: EXPENSE_UPDATE_FAILED,
    payload: {
      errors
    }
  }
}

export const expenseDeleted = (expense_id) => {
  return {
    type: EXPENSE_DELETED,
    payload: {
      expense_id
    }
  }
}

export const expenseDeleteFailed = (errors) => {
  return {
    type: EXPENSE_DELETE_FAILED,
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