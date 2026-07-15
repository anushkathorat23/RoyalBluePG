const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/** Generate JWT token */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

/** @desc Login admin | @route POST /api/auth/login */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.validatedBody || req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      token: generateToken(admin._id),
      admin: { id: admin._id, username: admin.username, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** @desc Get current admin | @route GET /api/auth/me */
exports.getMe = async (req, res) => {
  res.json({ success: true, admin: req.admin });
};
