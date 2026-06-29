const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// @route   POST /api/v3/sa/auth/register
// @desc    Register a new BUK student
router.post('/register', async (req, res) => {
  try {
    const { name, studentId, password } = req.body;

    // Check if student already exists
    let user = await User.findOne({ studentId });
    if (user) {
      return res.status(400).json({ msg: 'Student ID already registered' });
    }

    // Create and save the new user
    user = new User({ name, studentId, password });
    await user.save();

    // Generate the JWT Token
    const payload = { user: { id: user.id, name: user.name } };
    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }, // Token valid for 7 days
      (err, token) => {
        if (err) throw err;
        res.json({ token, msg: 'Registration successful' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/v3/sa/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  try {
    const { studentId, password } = req.body;

    // Verify user exists
    let user = await User.findOne({ studentId });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check password against the hashed database value
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Generate the JWT Token
    const payload = { user: { id: user.id, name: user.name } };
    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token, msg: 'Login successful' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;