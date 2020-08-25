import React, { Fragment, useEffect } from 'react';
import './Dashboard.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAllExpenses } from '../../services/expenseService';

import MoneyCard from '../money-card/MoneyCard';
import ExpenseFilter from './expense-filter/ExpenseFilter';

const Dashboard = ({ expenses, fetchAllExpenses }) => {
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchAllExpenses();
  }, []);

  return (
    <Fragment>
      <h2 className="text-center mt-3">Összegzés</h2>
      <ExpenseFilter />
      {expenses && expenses.length > 0 ? expenses.map(moneyData => {
          return <MoneyCard moneyData={moneyData} key={moneyData._id} />;
      }) : (<h2 className='text-center mt-3'>Nincs megjeleníthető tranzakció!</h2>)}

    </Fragment>
  )
}

Dashboard.propTypes = {
  fetchAllExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.array
};

const mapStateToProps = state => ({
  expenses: state.expenses.expenses
});

export default connect(mapStateToProps, { fetchAllExpenses })(Dashboard);
