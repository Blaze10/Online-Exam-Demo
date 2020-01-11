const Question = require('../models/questions');

// Create new question
exports.createQuestion = (req, res, next) => {
  if (req.userData.role !== 'Admin') {
    return res.status(402).json({message: 'Unauthorized'});
  }
  const question = new Question({
    question: req.body.question,
    marks: req.body.marks,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer
  });
  question.save()
  .then((result) => {
    res.status(201).json({message: 'Question created successfully'});
  })
  .catch(error => {
    console.log(error);
    res.status(404).json({message: 'Question creation failed! Please try again'});
  })
};

// Get list of questions
exports.getQuestions = (req, res, next) => {
  let fetchedQuestions;
  Question.find(null, null, {sort: '-created_on'})
  .then((documents) => {
    fetchedQuestions = documents;
    return Question.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      questions: fetchedQuestions,
      message: 'Fetched questions successfully',
      count: count
    });
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({message: 'Fetching questions failed.'});
  });
};

// Update question
exports.updateQuestion = (req, res, next) => {
  if (req.userData.role !== 'Admin') {
    return res.status(402).json({message: 'Unauthorized'});
  }
  const question = new Question({
    _id: req.params.id,
    question: req.body.question,
    marks: req.body.marks,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer
  });
  Question.updateOne({ _id: req.params.id }, question)
  .then((result) => {
    if (result.n > 0) {
      return res.status(200).json({message: 'Changes saved successfuly'});
    } else {
      res.status(404).json({message: 'Update failed. Question not found'});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({message: 'Update failed. Please try again.'});
  });
};

// Get question by id
exports.getSingleQuestion = (req, res, next) => {
  // if (req.userData.role !== 'Admin') {
  //   return res.status(402).json({message: 'Unauthorized'});
  // }
  Question.findById(req.params.id)
  .then(question => {
    if (!question) {
      return res.status(404).json({message: 'Question with given id does not exists'});
    }
    res.status(200).json({
      message: 'Question fetched successfully',
      question: question
    });
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({message: 'Unable to fetch selected question. Please try again.'});
  })
};

// Delete question
exports.deleteQuestion =  (req, res, next) => {
  if (req.userData.role !== 'Admin') {
    return res.status(402).json({message: 'Unauthorized'});
  }
  Question.deleteOne({ _id: req.params.id })
  .then(result => {
    if (result.n > 0) {
      res.status(200).json({message: 'Deletion successful'});
    } else {
      res.status(404).json({message: 'Deletion failed'});
    }
  })
  .catch(error => {
    res.status(404).json({message: 'Deletion failed. Please try again.'});
  })
};
