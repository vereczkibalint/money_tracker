import api from '../utils/api';

import { expenseFetched, expenseFetchFailed, expenseCreated, expenseCreateFailed, expenseUpdated, expenseUpdateFailed, expenseDeleted, expenseDeleteFailed, expenseFilterBySearchTerm } from '../actions/expenses/expenseActions';

const API_PATH = '/expenses';

export const fetchAllExpenses = () => {
  return (dispatch) => {
    api.get(API_PATH).then(response => {
      dispatch(expenseFetched(response.data));
    }).catch(err => {
      const { errors } = err.response.data;
      dispatch(expenseFetchFailed(errors));
    })
  }
}

export const createExpense = (expense) => {
  return (dispatch) => {
    api.post(API_PATH, expense).then(response => {
      dispatch(expenseCreated(response.data));
    }).catch(err => {
      const { errors } = err.response.data;
      dispatch(expenseCreateFailed(errors));
    })
  }
}

export const updateExpense = (expense) => {
  return (dispatch) => {
    api.put(API_PATH+`/${expense._id}`, expense).then(response => {
      dispatch(expenseUpdated(response.data));
    }).catch(err => {
      const { errors } = err.response.data;
      dispatch(expenseUpdateFailed(errors));
    })
  }
}

export const deleteExpense = (expense_id) => {
  return (dispatch) => {
    api.delete(API_PATH + `/${expense_id}`).then(response => {
      dispatch(expenseDeleted(expense_id));
    }).catch(err => {
      const { errors } = err.response.data;
      dispatch(expenseDeleteFailed(errors));
    })
  }
}

export const filterExpensesBySearchTerm = (searchTerm) => {
  return (dispatch) => {
    dispatch(expenseFilterBySearchTerm(searchTerm));
  }
}