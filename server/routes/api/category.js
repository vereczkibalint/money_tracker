const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const { fetchAllCategories, fetchCategoryById, insertCategory, updateCategory, deleteCategory } = require('../../services/CategoryService');

// @route  GET /api/categories
// @desc   Fetch all categories
// @access Private TODO
router.get('/', /* auth */ (req, res) => { 
    try {
        fetchAllCategories((error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Szerver hiba!');
    }
});

// @route  GET /api/categories/:categoryId
// @desc   Fetch category by ID
// @access Private TODO
router.get('/:categoryId', /* auth */ (req, res) => {
    try {
        const { categoryId } = req.params;

        fetchCategoryById(categoryId, (error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Szerver hiba!');
    }
});

// @route  POST /api/categories
// @desc   Create a category
// @access Private TODO
router.post('/', [
    // auth
    check('name', 'Kategória név megadása kötelező!').notEmpty(),
    check('color', 'Szín megadása kötelező!').notEmpty()
], (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ status_code: "ERR_VALIDATION_ERROR", errors: errors.array() });
        }

        const newCategory = {
            name: req.body.name,
            color: req.body.color
        };

        insertCategory(newCategory, (error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Szerver hiba!');
    }
});

// @route  PUT /api/categories/:categoryId
// @desc   Modify a category
// @access Private TODO
router.put('/:categoryId', [
    // auth
    check('name', 'Kategória név megadása kötelező!').notEmpty(),
    check('color', 'Szín megadása kötelező!').notEmpty()
], (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ status_code: "ERR_VALIDATION_ERROR", errors: errors.array() });
        }

        const { name, color } = req.body;
        const { categoryId } = req.params;

        const category = {
            id: categoryId,
            name,
            color
        };

        updateCategory(category, (error) => {
            return res.status(400).json(error);
        }, (result) => {
            return res.json(result);
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Szerver hiba!');
    }
});

// @route  DELETE /api/categories/:categoryId
// @desc   Delete a category
// @access Private TODO
router.delete('/:categoryId', /* auth */ (req, res) => {
    try {
        const { categoryId } = req.params;

        deleteCategory(categoryId, (error) => {
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