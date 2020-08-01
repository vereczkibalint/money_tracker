const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    lastName: String,
    firstName: String,
    password: String,
    email: String,
    avatar: String
});

module.exports = mongoose.model('user', UserSchema);