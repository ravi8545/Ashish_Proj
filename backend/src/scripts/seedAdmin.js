require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

const seed = async () => {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || '').toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Ashish';

  if (!email || !password) {
    console.error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`ℹ️  Admin already exists: ${email}`);
    await mongoose.disconnect();
    process.exit(0);
  }

  await Admin.create({ name, email, password });
  console.log(`✅ Admin created: ${email}`);
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch(async (err) => {
  console.error('❌ Seed failed:', err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
