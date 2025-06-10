import { Request, Response } from 'express';
import { Message } from '../models/Message';

export const getMessages = async (req: Request, res: Response) => {
    try {
        // Sort by timestamp (which exists in the schema) instead of createdAt
        const messages = await Message.find().sort({ timestamp: -1 }).limit(50);
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ message: 'Error retrieving messages' });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    const { username, content } = req.body;

    // Validate input
    if (!username || !content) {
        return res.status(400).json({ message: 'Username and content are required' });
    }

    const newMessage = new Message({
        username,
        content,
        // timestamp will be set automatically by the schema default
    });

    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
};