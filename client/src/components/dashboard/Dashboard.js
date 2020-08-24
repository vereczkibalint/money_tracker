import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAllExpenses } from '../../services/expenseService';

import MoneyCard from '../money-card/MoneyCard';

const Dashboard = ({ expenses, fetchAllExpenses }) => {
  
  useEffect(() => {
    fetchAllExpenses();
  }, [fetchAllExpenses]);

  return (
    <div>
      <h2 className="text-center mt-2">Az összes pénzmozgás</h2>
      {expenses.map(moneyData => {
          return <MoneyCard moneyData={moneyData} key={moneyData._id} />;
      })}
    </div>
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
