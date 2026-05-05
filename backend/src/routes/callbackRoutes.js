const express = require('express');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const {
  createCallback,
  getCallbacks,
  getCallback,
  updateCallback,
  deleteCallback,
} = require('../controllers/callbackController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validate');

const router = express.Router();

// Anti-spam limit on public form
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

router.post(
  '/',
  submitLimiter,
  [
    body('name').isString().trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('phone')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('Phone is required')
      .matches(/^[0-9+\-\s()]{7,20}$/)
      .withMessage('Invalid phone number'),
    body('message').optional().isString().trim().isLength({ max: 1000 }),
  ],
  validate,
  createCallback
);

router.get('/', protect, getCallbacks);
router.get('/:id', protect, getCallback);
router.put('/:id', protect, updateCallback);
router.delete('/:id', protect, deleteCallback);

module.exports = router;
