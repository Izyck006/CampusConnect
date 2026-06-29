const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // 1. Import native HTTP module
const { Server } = require('socket.io'); // 2. Import Socket.io
require('dotenv').config();

const app = express();

// Middleware Setup
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Cluster Connected - Group 7 Database Online'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error. Is MongoDB running locally?', err.message);
    process.exit(1);
  });

// Mount Authentication Routes
app.use('/api/v3/sa/auth', require('./routes/auth'));

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
    origin: "*", // Allows your Expo app to connect without CORS blocking
    methods: ["GET", "POST"]
  }
});

// Real-time Chat Connection Listener
io.on('connection', (socket) => {
  console.log(`⚡ A student device connected: ${socket.id}`);
  
  // This is where we will add the typing indicators and message broadcasts later
  
  socket.on('disconnect', () => {
    console.log(`🔌 Device disconnected: ${socket.id}`);
  });
});

// Server Initialization
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Node API & WebSocket Server running on port ${PORT}`);
});