import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { setRoutes } from './routes/index';
import { chatHandler } from './socket/chatHandler';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
setRoutes(app);

// Socket.io setup
io.on('connection', chatHandler);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});