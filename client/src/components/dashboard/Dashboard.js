import React, { Fragment, useState, useEffect } from 'react';
import './Dashboard.css';
import "react-datepicker/dist/react-datepicker.css";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAllExpenses, filterExpensesBySearchTerm } from '../../services/expenseService';
import { Form } from 'react-bootstrap';

import DatePicker from 'react-datepicker';

import MoneyCard from '../money-card/MoneyCard';

const Dashboard = ({ expenses, fetchAllExpenses, filterExpensesBySearchTerm }) => {

  const [searchTerm, setSearchTerm] = useState('');
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  return (
    <Fragment>
      <h2 className="text-center mt-3">Összegzés</h2>
      <div className="expense-filter">
        <div className="mt-3 dateFilter" style={{margin: '0 auto'}}>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
          <div className="filters">
          <Form.Control type="text" style={{marginBottom: '5px'}} placeholder="Keresendő kifejezés..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <Form.Control as="select">
            <option value="income">Bevétel</option>
            <option value="expense">Kiadás</option>
          </Form.Control>
        </div>
        </div>
      </div>
      {expenses.length > 0 && expenses.map(moneyData => {
          return <MoneyCard moneyData={moneyData} key={moneyData._id} />;
      })}
    </Fragment>
  )
}

Dashboard.propTypes = {
  fetchAllExpenses: PropTypes.func.isRequired,
  filterExpensesBySearchTerm: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  expenses: PropTypes.array
};

const mapStateToProps = state => ({
  expenses: state.expenses.expenses
});

export default connect(mapStateToProps, { fetchAllExpenses, filterExpensesBySearchTerm })(Dashboard);
