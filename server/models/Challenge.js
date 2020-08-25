const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
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
  goalAmount: {
    type: Number
  },
  deadline: {
    type: Date
  },
  total: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('challenge', ChallengeSchema);