import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';

const ChatRoom: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [currentUsername, setCurrentUsername] = useState<string>('Anonymous'); // Add username state
    const socket = useSocket('http://localhost:3001');

    useEffect(() => {
        if (!socket) return;

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on('userList', (userList) => {
            setUsers(userList);
        });

        // Listen for username confirmation or set it when connecting
        socket.on('usernameSet', (username) => {
            setCurrentUsername(username);
        });

        return () => {
            socket.off('message');
            socket.off('userList');
            socket.off('usernameSet');
        };
    }, [socket]);

    const handleSendMessage = (message: string) => {
        socket?.emit('sendMessage', message);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-auto">
                <MessageList messages={messages} currentUsername={currentUsername} />
            </div>
            <UserList users={users} />
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatRoom;