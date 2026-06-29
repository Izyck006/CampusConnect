const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: { 
    type: String, 
    required: true 
  },
  senderName: {
    type: String,
    required: true
  },
  text: { 
    type: String, 
    required: true 
  },
  room: { 
    type: String, 
    default: 'Group 7' 
  }
}, { timestamps: true }); 

module.exports = mongoose.model('Message', MessageSchema);