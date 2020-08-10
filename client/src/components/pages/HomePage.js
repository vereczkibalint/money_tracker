import React from 'react';
import ExpenseBox from '../ExpenseBox';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    filterExpenses: {
        marginBottom: 20
    },
    filterElement: {
        marginRight: 5
    }
}));

const HomePage = () => {
    const classes = useStyles();

    const expense1 = {
        title: 'My First Expense',
        description: 'This is my first expense',
        amount: 2000,
        type: 'expense'
    };

    const expense2 = {
        title: 'My Second Expense',
        description: 'This is my second expense',
        amount: 2000,
        type: 'income'
    };

    const expense3 = {
        title: 'My Third Expense',
        description: 'This is my third expense',
        amount: 500,
        type: 'income'
    };

    return (
        <div>
            <div className={classes.filterExpenses}>
                <TextField id="title" label="Keresés címben" className={classes.filterElement} />
                <TextField
                    id="date"
                    label="Kezdet"
                    type="date"
                    defaultValue={new Date()}
                    className={classes.filterElement}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField
                    id="date"
                    label="Vége"
                    type="date"
                    defaultValue={new Date()}
                    className={classes.filterElement}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </div>
            <ExpenseBox expense={expense1} />
            <ExpenseBox expense={expense2} />
            <ExpenseBox expense={expense3} />
        </div>
    )
}

export default HomePage;
