const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  question: {type: String, required: true},
  marks: {type: Number, required: true},
  options: {type: [String], required: true},
  correctAnswer: {type: String, require: true},
  created_on: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Question', questionSchema);
