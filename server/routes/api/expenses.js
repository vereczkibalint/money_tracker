const express = require('express');

const auth = require('../../middleware/auth');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const { fetchExpense, insertExpense, updateExpense, deleteExpense } = require('../../services/MoneyService');

// @route  GET /api/expenses
// @desc   Returns all income and expenses associated to authorized user.
// @access Private
router.get('/',
  auth,
(req, res) => {
  try {
    const { id: userId } = req.user;
    fetchExpense(userId.toString(), (error) => {
      return res.status(400).json({ status_code: error.status_code, errors: [ {msg: error.message} ] });
    }, (result) => {
      return res.json(result);
    });
  } catch (err) {
    if(err.kind === "ObjectId") {
      error({ status_code: 'ERR_EXPENSE_NOTFOUND', message: 'Kiadás nem található!' });
    }
    console.error(err.message);
    return res.status(500).json({ status_code: 'ERR_INTERNAL_SERVER', errors: [ {msg: 'Szerver hiba!'}] });
  }
});

// @route  POST /api/expenses
// @desc   Inserts an income or expense associated to authorized user.
// @access Private
router.post('/', 
  auth,
  check('title', 'Cím megadása kötelező!').notEmpty(),
  check('description', 'Leírás megadása kötelező!').notEmpty(),
  check('moneyType', 'Típus megadása kötelező!').custom(value => value === "income" || value === "expense"),
  check('amount', 'Érték megadása kötelező!').isNumeric(),
  check('issueDate', 'Dátum megadása kötelező!').isISO8601(),
(req, res) => {
  try{
    const validationErrors = validationResult(req);
	if(!validationErrors.isEmpty()){
		const { errors } = validationErrors;
		return res.status(400).json({ status_code: 'ERR_VALIDATION_ERROR', errors });
	}

    const { title, description, moneyType, amount, issueDate } = req.body;
    const { id: userId } = req.user;
  
    const moneyData = {
      title,
      description,
      ownedBy: userId.toString(),
      moneyType,
      amount,
      issueDate
    }
  
    insertExpense(moneyData, (error) => {
      return res.status(400).json(error);
    }, (result) => {
      return res.json(result);
    });
  } catch (err) {
    if(err.kind === "ObjectId") {
      error({ status_code: 'ERR_EXPENSE_FAILED_INSERT', errors: [ { msg: 'Hiba történt az összeg mentése közben!'} ] });
    }
    console.error(err.message);
    return res.status(500).json({ status_code: 'ERR_INTERNAL_SERVER', errors: [ { msg: 'Szerver hiba!'}] });
  }
});

// @route  PUT /api/expenses/:expenseId
// @desc   Updates an income or expense associated to authorized user. 
// @access Private
router.put('/:expenseId',
  auth,
  check('title', 'Cím megadása kötelező!').notEmpty(),
  check('description', 'Leírás megadása kötelező!').notEmpty(),
  check('moneyType', 'Típus megadása kötelező!').custom(value => value === "income" || value === "expense"),
  check('amount', 'Érték megadása kötelező! (0-nál nagyobb érték)').isNumeric().custom(value => value > 0),
  check('issueDate', 'Dátum megadása kötelező!').isISO8601(),
(req, res) => {
  try {
    const validationErrors = validationResult(req);
	if(!validationErrors.isEmpty()){
      const { errors } = validationErrors;
      return res.status(400).json({ status_code: 'ERR_VALIDATION_ERROR', errors });
	}

    const { title, description, moneyType, amount, issueDate } = req.body;
    const { id: userId } = req.user;
    const { expenseId } = req.params;
  
    const moneyData = {
      title,
      description,
      expenseId,
      ownedBy: userId.toString(),
      moneyType,
      amount,
      issueDate
    }

    updateExpense(moneyData, (error) => {
      return res.status(400).json({ status_code: error.status_code, errors: [ { msg: error.message}] });
    }, (result) => {
      return res.json(result);
    });

  } catch (err) {
    if(err.kind === "ObjectId") {
      error({ status_code: 'ERR_EXPENSE_FAILED_INSERT', errors: [ { msg: 'Hiba történt az összeg mentése közben!' }] });
    }
    console.error(err.message);
    return res.status(500).json({ status_code: 'ERR_INTERNAL_SERVER', errors: [ { msg: 'Szerver hiba!' }] });
  }
});

// @route  DELETE /api/expenses/:expenseId
// @desc   Deletes an income or expense associated to authorized user. 
// @access Private
router.delete('/:expenseId', auth, (req, res) => {
  try {
    const { expenseId } = req.params;
    const { id: userId } = req.user;

    const moneyData = { expenseId, userId };
    deleteExpense(moneyData, (error) => {
      return res.status(400).json({ status_code: error.status_code, errors: [ { msg: error.message }] });
    }, (result) => {
      return res.json(result);
    })

  } catch (err) {
    if(err.kind === "ObjectId") {
      error({ status_code: 'ERR_EXPENSE_FAILED_INSERT', errors: [ { msg: 'Hiba történt az összeg mentése közben!' }] });
    }
    console.error(err.message);
    return res.status(500).json({ status_code: 'ERR_INTERNAL_SERVER', errors: [ { msg: 'Szerver hiba!' }] });
  }
});

module.exports = router;