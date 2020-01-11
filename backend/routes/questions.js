const express = require('express');
const QuestionController = require('../controllers/questions');
const checkAuth = require('../middleware/auth-check');
const router = express.Router();

// create question
router.post('/addQuestion', checkAuth, QuestionController.createQuestion);

// get list of questions
router.get('/list', checkAuth, QuestionController.getQuestions);

// update question
router.patch('/:id', checkAuth, QuestionController.updateQuestion);

// Get questions by id
router.get('/:id', checkAuth, QuestionController.getSingleQuestion);

// delete question
router.delete('/:id', checkAuth, QuestionController.deleteQuestion)

module.exports = router;
