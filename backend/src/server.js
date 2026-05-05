require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const callbackRoutes = require('./routes/callbackRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// --- Core middleware ---
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN
      ? process.env.CLIENT_ORIGIN.split(',').map((s) => s.trim())
      : true,
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Global API rate limiter (lightweight)
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// --- Health check ---
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Ashish backend is running',
    timestamp: new Date().toISOString(),
  });
});

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/callback', callbackRoutes);
app.use('/api/portfolio', portfolioRoutes);

// --- 404 + Error handler ---
app.use(notFound);
app.use(errorHandler);

// --- Start ---
const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

start();

// Safety nets
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

module.exports = app;
