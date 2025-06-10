import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import chatRoutes from './routes/chat';
import { setupSocketHandlers } from './socket/socketHandlers';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Chat Server is running!', 
    endpoints: {
      messages: '/api/chat/messages',
      websocket: 'Connect via Socket.IO'
    }
  });
});

app.use('/api/chat', chatRoutes);

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatroom';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Socket.IO setup
setupSocketHandlers(io);

const PORT = process.env.PORT || 5001;

// Start server
const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api/chat`);
  });
};

startServer();