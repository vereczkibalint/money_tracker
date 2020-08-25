const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

const connectToDB = require('./config/db');

connectToDB();

const categoryRouter = require('./routes/api/category');
const userRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const expensesRouter = require('./routes/api/expenses');
const challengeRouter = require('./routes/api/challenges');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/challenges', challengeRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`A szerver elindult a(z) ${PORT} porton!`));