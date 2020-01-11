const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  score: {type: Number, required: true},
  correctAnswers: {type: Number, requird: true},
  incorrectAnswers: {type: Number, require: true},
  answerList: {type: [{questionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'}, answer: {type: String}}], required: true},
  created_on: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Result', resultSchema);
