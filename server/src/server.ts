import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import chatRoutes from './routes/chat';
import { setupSocket } from './socket/socketHandlers';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());
app.use('/api/chat', chatRoutes);

// Socket.IO setup
setupSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});