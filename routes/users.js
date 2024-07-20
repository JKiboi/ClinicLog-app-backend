const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const { getUser } = require('../controllers/userController');

// @route   GET api/users
// @desc    Get user by token
// @access  Private
router.get('/', auth, getUser);

module.exports = router;
