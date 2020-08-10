import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    marginBottom: 20
  },
  title: {
    fontSize: 14,
  },
  amount: {
    textAlign: 'right'
  },
  incomeAmount: {
    color: "green",
    fontWeight: 700
  },
  expenseAmount: {
    color: "#fc3232",
    fontWeight: 700
  }
});


const ExpenseBox = ({ expense }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {expense.title}
        </Typography>
        <Typography component="p">
          {expense.description}
        </Typography>
        <Typography className={classes.amount}>
          {expense.type === "income" ? 
            (
              <Typography component="span" className={classes.incomeAmount}>+{expense.amount} Ft</Typography>
            ) : (
              <Typography component="span" className={classes.expenseAmount}>-{expense.amount} Ft</Typography>
            )
          } 
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ExpenseBox;