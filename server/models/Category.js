const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hexaColorValidator = (value) => (/^#([0-9a-f]{3}){1,2}$/i).test(value);

const CategorySchema = new Schema({
    name: String,
    color: String
});

module.exports = mongoose.model('category', CategorySchema);