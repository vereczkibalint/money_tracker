const express = require('express');

const router = express.Router();

const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator');
const { fetchAllUsers, fetchUserById, registerUser, deleteUser, changePassword } = require('../../services/UserService');

// @route  GET /api/users
// @desc   Fetch all user
// @access Public (YET) 
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

// @route  GET /api/users/:userId
// @desc   Fetches user by given userID
// @access Public (YET) 
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

// @route  POST /api/users/
// @desc   Register user
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
            return res.status(400).json({ status_code: "ERR_VALIDATION_ERROR", errors: errors });
        }

        const { lastName, firstName, email, password, password_confirm } = req.body;
        
        const newUser = {
            lastName, firstName, email, password, password_confirm
        };

        registerUser(newUser, (error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status_code: 'ERR_INTERNAL_SERVER', message: 'Szerver hiba!' });
    }
});

// @route  POST /api/users/password_change/:userId
// @desc   Modify users password
// @access Private
router.post('/password_change/:userId',
    auth,
    check('old_password', 'Régi jelszó megadása kötelező!').notEmpty(),
    check('password', 'Jelszó megadása kötelező (min. 6 karakter)!').notEmpty().isLength({ min: 6 }),
    check('password_confirm', 'A két jelszó nem egyezik meg!').notEmpty().custom((value, { req }) => value === req.body.password)
, (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ status_code: "ERR_VALIDATION_ERROR", errors: errors });
        }
        const { userId } = req.params;
        const { id } = req.user;
        
        if(id.toString() !== userToDeleteId) {
            return res.status(400).json({ status_code: 'ERR_USER_NOTAUTHORIZED', message: 'Autentikációs hiba!' });
        }
        
        const { old_password, password } = req.body;
        const user = {
            id: userId,
            old_password,
            password
        };

        changePassword(user, (error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Szerver hiba!');
    }
});

// @route  DELETE /api/users/:userId
// @desc   Delete users data
// @access Private
router.delete('/:userId', auth, (req, res) => {
    try {
        const { userId } = req.params;
        const { id } = req.user;

        if(id.toString() !== userId) {
            return res.status(400).json({ status_code: 'ERR_USER_NOTAUTHORIZED', message: 'Autentikációs hiba!' });
        }

        deleteUser(userId, (error) => {
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