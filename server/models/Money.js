const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MoneySchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    year: Number,
    month: Number,
    amount: Number
});

module.exports = mongoose.model('money', MoneySchema);