const express = require('express');
const { body } = require('express-validator');
const { login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validate');

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
  ],
  validate,
  login
);

router.get('/me', protect, getMe);

module.exports = router;
