const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); 
const { Server } = require('socket.io'); 
require('dotenv').config();

// Import Models
const Message = require('./models/Message');

const app = express();

// Middleware Setup
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Cluster Connected - Group 7 Database Online'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// Mount REST Routes
app.use('/api/v3/sa/auth', require('./routes/auth'));
app.use('/api/v3/sa/chat', require('./routes/chat')); // The missing piece!

// Health Check Route
app.get('/api/v3/sa/health', (req, res) => {
  res.status(200).json({ 
    status: 'active', 
    module: 'Campus Connect Core',
    university: 'Bayero University Kano' 
  });
});

// Create the HTTP Server and Attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// Real-time Chat Engine
io.on('connection', (socket) => {
  console.log(`⚡ A student device connected: ${socket.id}`);

  // 1. Join a specific chat room
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  // 2. Listen for new messages
  socket.on('send_message', async (data) => {
    try {
      // Save the message directly to MongoDB cloud
      const newMessage = new Message({
        senderId: data.senderId,
        senderName: data.senderName,
        text: data.text,
        room: data.room
      });
      await newMessage.save();

      // Broadcast the message to everyone else in that room INSTANTLY
      socket.to(data.room).emit('receive_message', data);
      console.log(`Message broadcasted in ${data.room} by ${data.senderName}`);
    } catch (err) {
      console.error('Error saving message:', err.message);
    }
  });

  // 3. Handle Disconnects
  socket.on('disconnect', () => {
    console.log(`🔌 Device disconnected: ${socket.id}`);
  });
});

// Server Initialization
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Node API & WebSocket Server running on port ${PORT}`);
});