import { Request, Response } from 'express';
import { Message } from '../models/Message';

export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving messages' });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    const { username, content } = req.body;

    const newMessage = new Message({
        username,
        content,
        createdAt: new Date(),
    });

    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error sending message' });
    }
};