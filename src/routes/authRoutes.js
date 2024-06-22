const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User signup
router.post('/signup', authController.signup);
// User signin
router.post('/signin', authController.signin);
// Driver sign up
router.post('/signup/driver', authController.signupDriver);
// Driver sign in
router.post('/signin/driver', authController.signinDriver);

module.exports = router;
