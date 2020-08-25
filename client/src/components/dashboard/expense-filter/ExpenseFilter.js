import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import { filterExpensesBySearchTerm } from '../../../services/expenseService';

const ExpenseFilter = ({ filterExpensesBySearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onDateChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


  return (
    <div className="expense-filter">
      <div className="mt-3 dateFilter" style={{margin: '0 auto'}}>
        <DatePicker
          selected={startDate}
          onChange={onDateChange}
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
  );
}

ExpenseFilter.propTypes = {
  filterExpensesBySearchTerm: PropTypes.func.isRequired
};

export default connect(null, { filterExpensesBySearchTerm })(ExpenseFilter);