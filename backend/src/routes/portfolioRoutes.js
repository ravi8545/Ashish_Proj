const express = require('express');
const { body } = require('express-validator');
const {
  getPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validate');

const router = express.Router();

const buildValidators = ({ optional = false } = {}) => {
  const wrap = (chain) => (optional ? chain.optional() : chain);
  return [
    wrap(body('title').isString().trim().notEmpty().withMessage('Title is required')),
    wrap(
      body('category')
        .isIn(['weddings', 'commercials', 'events', 'music'])
        .withMessage('Invalid category')
    ),
    wrap(body('thumbnail').isURL().withMessage('Thumbnail must be a valid URL')),
    wrap(body('videoUrl').isURL().withMessage('videoUrl must be a valid URL')),
    body('description').optional().isString().trim().isLength({ max: 2000 }),
  ];
};

router.get('/', getPortfolios);
router.get('/:id', getPortfolio);

router.post('/', protect, buildValidators(), validate, createPortfolio);
router.put('/:id', protect, buildValidators({ optional: true }), validate, updatePortfolio);
router.delete('/:id', protect, deletePortfolio);

module.exports = router;
