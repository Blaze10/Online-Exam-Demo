const express = require('express');
const UserController = require('../controllers/user');
const router = express.Router();

// User signup
router.post('/signup', UserController.signup);

//User login
router.post('/login', UserController.login);

module.exports = router;
