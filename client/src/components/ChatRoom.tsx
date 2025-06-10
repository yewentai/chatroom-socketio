import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const socket = io('http://localhost:4000');

const ChatRoom: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        socket.on('message', (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = (message: string) => {
        socket.emit('message', message);
    };

    return (
        <div className="flex flex-col h-screen">
            <MessageList messages={messages} />
            <MessageInput onSendMessage={sendMessage} />
        </div>
    );
};

export default ChatRoom;