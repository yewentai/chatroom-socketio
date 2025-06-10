import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';

const ChatRoom: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const socket = useSocket();

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on('userList', (userList) => {
            setUsers(userList);
        });

        return () => {
            socket.off('message');
            socket.off('userList');
        };
    }, [socket]);

    const handleSendMessage = (message: string) => {
        socket.emit('sendMessage', message);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-auto">
                <MessageList messages={messages} />
            </div>
            <UserList users={users} />
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatRoom;