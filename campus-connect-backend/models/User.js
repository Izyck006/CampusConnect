const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  studentId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  groupAssignment: { 
    type: String, 
    default: 'Group 7' 
  }
}, { timestamps: true });

// Modern Pre-save hook (No 'next' callback needed)
UserSchema.pre('save', async function() {
  // If the password hasn't changed, just exit the function
  if (!this.isModified('password')) return;
  
  // Otherwise, hash it
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);