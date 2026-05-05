const Callback = require('../models/Callback');

// @desc   Submit a callback request
// @route  POST /api/callback
// @access Public
exports.createCallback = async (req, res, next) => {
  try {
    const { name, phone, message } = req.body;

    const callback = await Callback.create({
      name: name.trim(),
      phone: phone.trim(),
      message: (message || '').trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! We will call you back shortly.',
      data: callback,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get all callback requests with pagination & filters
// @route  GET /api/callback?status=&search=&page=&limit=
// @access Private (admin)
exports.getCallbacks = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status && ['pending', 'contacted'].includes(req.query.status)) {
      filter.status = req.query.status;
    }

    if (req.query.search) {
      const regex = new RegExp(req.query.search.trim(), 'i');
      filter.$or = [{ name: regex }, { phone: regex }, { message: regex }];
    }

    const [items, total] = await Promise.all([
      Callback.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Callback.countDocuments(filter),
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

// @desc   Get single callback
// @route  GET /api/callback/:id
// @access Private (admin)
exports.getCallback = async (req, res, next) => {
  try {
    const callback = await Callback.findById(req.params.id);
    if (!callback) {
      return res.status(404).json({ success: false, message: 'Callback not found' });
    }
    res.status(200).json({ success: true, data: callback });
  } catch (err) {
    next(err);
  }
};

// @desc   Update callback status
// @route  PUT /api/callback/:id
// @access Private (admin)
exports.updateCallback = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['pending', 'contacted'].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid status. Must be "pending" or "contacted".' });
    }

    const callback = await Callback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!callback) {
      return res.status(404).json({ success: false, message: 'Callback not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Callback updated',
      data: callback,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Delete callback
// @route  DELETE /api/callback/:id
// @access Private (admin)
exports.deleteCallback = async (req, res, next) => {
  try {
    const callback = await Callback.findByIdAndDelete(req.params.id);
    if (!callback) {
      return res.status(404).json({ success: false, message: 'Callback not found' });
    }
    res.status(200).json({ success: true, message: 'Callback deleted' });
  } catch (err) {
    next(err);
  }
};
