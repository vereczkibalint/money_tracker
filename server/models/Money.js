const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MoneySchema = new Schema({
  ownedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  moneyType: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  amount: {
    type: Number,
    min: 1,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('money', MoneySchema);