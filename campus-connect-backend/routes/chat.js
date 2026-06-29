const express = require('express');
const Message = require('../models/Message');
const router = express.Router();


router.get('/history/:room', async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room })
      .sort({ createdAt: 1 }) 
      .limit(50); 
    
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;