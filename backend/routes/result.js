const express = require('express');
const checkAuth = require('../middleware/auth-check');
const ResultController = require('../controllers/result');

const router = express.Router();

// Post result
router.post('', checkAuth, ResultController.addResult);

// Get result list
router.get('', checkAuth, ResultController.getResults);


module.exports = router;
