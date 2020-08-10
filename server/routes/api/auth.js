const express = require('express');
const router = express.Router();

const { loginUser } = require('../../services/AuthService');

const { check, validationResult } = require('express-validator');

// @route  POST /api/auth
// @desc   Login user
// @access Public
router.post('/',
  check('email', 'Email formátum nem megfelelő!').isEmail(),
  check('password', 'Jelszó megadása kötelező!').notEmpty()
, (req, res) => {
  const validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
      const { errors } = validationErrors;
      return res.status(400).json({ status_code: 'ERR_VALIDATION_ERROR', errors });
  }

  const { email, password } = req.body;

  const user = {
    email,
    password
  };

  loginUser(user, (error) => {
    return res.status(400).json(error);
  }, (result) => {
    return res.json(result);
  });


});

module.exports = router;