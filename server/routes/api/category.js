const express = require('express');
const router = express.Router();

const { check, validationError, validationResult } = require('express-validator');

const CategoryModel = require('../../models/Category');

// @route  GET /api/categories
// @desc   Fetch all categories
// @access Private TODO
router.get('/', /* auth */ async (req, res) => {
    try {
        const categories = await CategoryModel.find();

        if(categories) {
            return res.json(categories);
        }else {
            return res.status(400).json({ message: 'Nincsenek kategóriák!' });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Szerver hiba!');
    }
});

// @route  GET /api/categories/:categoryId
// @desc   Fetch category by ID
// @access Private TODO
router.get('/:categoryId', /* auth */ async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.categoryId);
        
        if(!category) {
            return res.status(404).json({ message: 'A kategória nem található!' });
        }

        return res.json(category);
    } catch (err) {
        if(err.kind === "ObjectId") {
            return res.status(400).json({ message: 'A kategória nem található!' });
        }
        console.error(err.message);
        return res.status(500).send('Szerver hiba!');
    }
});

// @route  POST /api/categories
// @desc   Create a category
// @access Private TODO
router.post('/', [
    // auth
    check('name', 'Kategória név megadása kötelező!'),
    check('color', 'Szín megadása kötelező!')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const newCategory = new CategoryModel({
            name: req.body.name,
            color: req.body.color
        });

        const category = await newCategory.save();

        return res.json(category);
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
    check('name', 'Kategória név megadása kötelező!'),
    check('color', 'Szín megadása kötelező!')
], async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.categoryId);
        
        if(!category){
            return res.status(404).json({ message: 'Kategória nem található!' });
        }

        category.name = req.body.name;
        category.color = req.body.color;

        await category.save();

        return res.json(category);
    } catch (err) {
        if(err.kind === "ObjectId") {
            return res.status(400).json({ message: 'A kategória nem található!' });
        }
        console.error(err.message);
        return res.status(500).send('Szerver hiba!');
    }
});

// @route  DELETE /api/categories/:categoryId
// @desc   Delete a category
// @access Private TODO
router.delete('/:categoryId', /* auth */ async (req, res) => {
    try {
        await CategoryModel.findOneAndRemove({ _id: req.params.categoryId });

        return res.json({ message: 'Kategória sikeresen törölve!' });
    } catch (err) {
        if(err.kind === "ObjectId") {
            return res.status(400).json({ message: 'A kategória nem található!' });
        }
        console.error(err.message);
        return res.status(500).send('Szerver hiba!');
    }
});

module.exports = router;