const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const { fetchAllChallenges, fetchChallengeById, insertChallenge, updateChallenge, deleteChallenge } = require('../../services/ChallengeService');

// @route  GET /api/challenges
// @desc   Fetch all challenges
// @access Private
router.get('/', auth, (req, res) => { 
    try {
        const { id: userId } = req.user;
        fetchAllChallenges(userId, (error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status_code: 'ERR_INTERNAL_SERVER', errors: [ {msg: 'Szerver hiba!'}] });
    }
});

// @route  GET /api/challenges/:challengeId
// @desc   Fetch challenge by ID
// @access Private
router.get('/:challengeId', auth, (req, res) => {
    try {
        const { challengeId } = req.params;
        const { id: userId } = req.user;

        const challengeData = { challengeId, userId };

        fetchChallengeById(challengeData, (error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status_code: 'ERR_INTERNAL_SERVER', errors: [ {msg: 'Szerver hiba!'}] });
    }
});

// @route  POST /api/challenges
// @desc   Create a challenge
// @access Private
router.post('/', [
    auth,
    check('title', 'Megnevezés megadása kötelező!').notEmpty(),
    check('description', 'Leírás megadása kötelező!').notEmpty(),
    check('goalAmount', 'Cél összeg beállítása kötelező!').isNumeric().custom(value => value > 0),
    check('deadline', 'Határidő beállítása kötelező!').isISO8601().custom(value => {
      let deadline = new Date(value);
      let today = new Date();
      return deadline > today;
    })
], (req, res) => {
    try {
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const { errors } = validationErrors;
            return res.status(400).json({ status_code: 'ERR_VALIDATION_ERROR', errors });
        }

        const { title, description, goalAmount, deadline } = req.body;
        const { id: userId } = req.user;

        const newChallenge = {
            title,
            description,
            goalAmount,
            deadline,
            ownedBy: userId.toString()
        };

        insertChallenge(newChallenge, (error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status_code: 'ERR_INTERNAL_SERVER', errors: [ {msg: 'Szerver hiba!'}] });
    }
});

// @route  PUT /api/challenges/:challengeId
// @desc   Modify a challenge
// @access Private
router.put('/:challengeId', [
    auth,
    check('title', 'Megnevezés megadása kötelező!').notEmpty(),
    check('description', 'Leírás megadása kötelező!').notEmpty(),
    check('goalAmount', 'Cél összeg beállítása kötelező!').isNumeric().custom(value => value > 0),
    check('deadline', 'Határidő beállítása kötelező!').isISO8601().custom(value => {
      let deadline = new Date(value);
      let today = new Date();
      return deadline > today;
    })
], (req, res) => {
    try {
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const { errors } = validationErrors;
            return res.status(400).json({ status_code: 'ERR_VALIDATION_ERROR', errors });
        }

        const { title, description, goalAmount, deadline } = req.body;
        const { challengeId } = req.params;
        const { id: userId } = req.user;

        const challenge = {
            id: challengeId,
            title,
            description,
            goalAmount,
            deadline,
            ownedBy: userId
        };

        updateChallenge(challenge, (error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status_code: 'ERR_INTERNAL_SERVER', errors: [ { msg : 'Szerver hiba!'}] });
    }
});

// @route  DELETE /api/challenges/:challengeId
// @desc   Delete a challenge
// @access Private
router.delete('/:challengeId', auth, (req, res) => {
    try {
        const { challengeId } = req.params;
        const { id: userId } = req.user;

        const challengeData = { challengeId, userId };

        deleteChallenge(challengeData, (error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status_code: 'ERR_INTERNAL_SERVER', errors: [ { msg: 'Szerver hiba!'}] });
    }
});

module.exports = router;