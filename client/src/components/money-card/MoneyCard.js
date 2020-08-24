import React from 'react';
import './MoneyCard.css';

import { Card } from 'react-bootstrap';

const MoneyCard = ({ moneyData }) => {
  return (
    <Card className="m-4 mx-auto moneyCard">
      <Card.Header className='border-0'>
        <h4>{moneyData.title}</h4>
      </Card.Header>
      <Card.Body>
        {moneyData.description}
      </Card.Body>
      <Card.Footer className='bg-white border-0'>
        <span className='expense-info'>
          <span className='expense-date'>
          {new Intl.DateTimeFormat('hu-HU', { 
                month: 'short', 
                day: '2-digit',
                year: 'numeric', 
          }).format(new Date(moneyData.issueDate))}
          </span>
        {moneyData.moneyType === 'expense' ? (
          <span className='text-danger font-weight-bold'>- {moneyData.amount},- Ft</span>
          ) : (
          <span className='text-success font-weight-bold'>+ {moneyData.amount},- Ft</span>
        )}
        </span>
      </Card.Footer>
    </Card>
  );
}

export default MoneyCard;