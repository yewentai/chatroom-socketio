import { Router } from 'express';
import { chatHandler } from '../socket/chatHandler';

const router = Router();

export const setRoutes = (app) => {
    app.use('/api/chat', router);

    router.post('/send', chatHandler.sendMessage);
    router.get('/messages', chatHandler.getMessages);
};