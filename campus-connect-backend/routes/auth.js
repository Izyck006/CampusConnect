const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { name, studentId, password } = req.body;

   
    let user = await User.findOne({ studentId });
    if (user) {
      return res.status(400).json({ msg: 'Student ID already registered' });
    }

    user = new User({ name, studentId, password });
    await user.save();

   
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


router.post('/login', async (req, res) => {
  try {
    const { studentId, password } = req.body;

    
    let user = await User.findOne({ studentId });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    
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