import { Router } from 'express';
import { getMessages, sendMessage } from '../controllers/chatController';

const router = Router();

// Route to get chat messages
router.get('/messages', getMessages);

// Route to send a new chat message
router.post('/messages', sendMessage);

export default router;