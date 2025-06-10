import React, { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Adjust the URL as needed

const MessageInput: React.FC = () => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', message);
            setMessage('');
        }
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="border rounded p-2 flex-grow"
            />
            <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-500 text-white rounded p-2"
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;