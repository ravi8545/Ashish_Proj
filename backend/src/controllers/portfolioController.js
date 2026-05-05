const Portfolio = require('../models/Portfolio');

const ALLOWED_CATEGORIES = ['weddings', 'commercials', 'events', 'music'];

// @desc   Get all portfolio items (public)
// @route  GET /api/portfolio?category=&page=&limit=&search=
// @access Public
exports.getPortfolios = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.category && ALLOWED_CATEGORIES.includes(req.query.category)) {
      filter.category = req.query.category;
    }
    if (req.query.search) {
      const regex = new RegExp(req.query.search.trim(), 'i');
      filter.$or = [{ title: regex }, { description: regex }];
    }

    const [items, total] = await Promise.all([
      Portfolio.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Portfolio.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: items.length,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      data: items,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get single portfolio item
// @route  GET /api/portfolio/:id
// @access Public
exports.getPortfolio = async (req, res, next) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// @desc   Create portfolio item
// @route  POST /api/portfolio
// @access Private (admin)
exports.createPortfolio = async (req, res, next) => {
  try {
    const item = await Portfolio.create(req.body);
    res.status(201).json({ success: true, message: 'Portfolio item created', data: item });
  } catch (err) {
    next(err);
  }
};

// @desc   Update portfolio item
// @route  PUT /api/portfolio/:id
// @access Private (admin)
exports.updatePortfolio = async (req, res, next) => {
  try {
    const item = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }
    res.status(200).json({ success: true, message: 'Portfolio item updated', data: item });
  } catch (err) {
    next(err);
  }
};

// @desc   Delete portfolio item
// @route  DELETE /api/portfolio/:id
// @access Private (admin)
exports.deletePortfolio = async (req, res, next) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }
    res.status(200).json({ success: true, message: 'Portfolio item deleted' });
  } catch (err) {
    next(err);
  }
};
