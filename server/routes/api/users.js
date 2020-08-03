const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');
const { fetchAllUsers, fetchUserById } = require('../../services/UserService');
const UserService = require('../../services/UserService');

router.get('/', (req, res) => {
    try {
        fetchAllUsers((error) => {
            return res.status(400).json({ status_code: error.status_code, message: error.message });
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status_code: 'ERR_INTERNAL_SERVER', message: 'Szerver hiba!' });
    }
});

router.get('/:userId', (req, res) => {
    try {
        const { userId } = req.params;

        fetchUserById(userId, (error) => {
            return res.status(400).json({ status_code: error.status_code, message: error.message });
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status_code: 'ERR_INTERNAL_SERVER', message: 'Szerver hiba!' });
    }
});

// @route POST /api/users/
// @desc Create user
// @access Public
router.post('/',
  check('lastName', 'Vezetéknév megadása kötelező!').notEmpty(),
  check('firstName', 'Keresztnév megadása kötelező!').notEmpty(),
  check('email', 'Email megadása kötelező!').isEmail(),
  check('password', 'Jelszó megadása kötelező (min. 6 karakter)!').notEmpty().isLength({ min: 6 }),
  check('password_confirm', 'A két jelszó nem egyezik meg!').custom((value, { req }) => value === req.body.password)
, (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors });
        }

        const { lastName, firstName, email, password, password_confirm } = req.body;
        
        const newUser = {
            lastName, firstName, email, password, password_confirm
        };

        UserService.registerUser(newUser, (error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Szerver hiba!');
    }
});

// @route POST /api/users/password_change/:userId
// @desc Modify users password
// @access Private TODO
router.post('/password_change/:userId',
    check('password', 'Jelszó megadása kötelező (min. 6 karakter)!').notEmpty().isLength({ min: 6 }),
    check('password_confirm', 'A két jelszó nem egyezik meg!').notEmpty().custom((value, { req }) => value === req.body.password)
, (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors });
        }
        /* validate that logged in users id matches the id in the params */
        const { userId } = req.params;
        const { password } = req.body;
        const user = {
            /* id: get it from token */
            id: userId,
            password
        };

        UserService.changePassword(user, (error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Szerver hiba!');
    }
});

// @route DELETE /api/users/:userId
// @desc Delete users data
// @access Private TODO
router.delete('/:userId', /* auth */ (req, res) => {
    try {
        const { userId } = req.params;
        UserService.deleteUser(userId, (error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Szerver hiba!');
    }
});
module.exports = router;