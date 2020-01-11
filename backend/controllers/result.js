const Result = require('../models/results');

// Create result
exports.addResult = (req, res, next) => {
  const result = new Result({
    userId: req.userData.userId, // <-- Change
    score: req.body.score,
    correctAnswers: req.body.correctAnswers,
    incorrectAnswers: req.body.incorrectAnswers,
    answerList: req.body.answerList,
  });
  result.save()
  .then(response => {
    res.status(201).json({message: 'Result saved succesffuly'});
  })
  .catch(error => {
    console.log(error);
    res.status(404).json({message: 'Failed. Please try again'});
  })
};

//Get list of results
exports.getResults = (req, res, next) => {
  let resultQuery = Result.find({ userId: req.userData.userId}, null, {sort: '-created_on'});
  if (req.userData.role === 'Admin') {
    resultQuery = Result.find(null, null, {sort: '-created_on'}).populate('userId', 'fullName');
  }
  resultQuery
  .then(response => {
    res.status(201).json({message: 'Result fetched succesffuly', results: response});
  })
  .catch(error => {
    console.log(error);
    res.status(404).json({message: 'Failed. Please try again'});
  });
};
