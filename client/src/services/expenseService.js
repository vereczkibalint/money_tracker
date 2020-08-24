import api from '../utils/api';

import { expenseFetched, expenseFetchFailed, expenseFilterBySearchTerm } from '../actions/expenses/expenseActions';

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

export const filterExpensesBySearchTerm = (searchTerm) => {
  return (dispatch) => {
    dispatch(expenseFilterBySearchTerm(searchTerm));
  }
}