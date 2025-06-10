import React, { useState, useEffect } from 'react';
import { useSocket } from './hooks/useSocket';
import { Message } from './types';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import './index.css';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>('');
  const [isUsernameSet, setIsUsernameSet] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<string>('general');
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      // Join the default room
      socket.emit('joinRoom', currentRoom);

      // Listen for new messages
      socket.on('message', (message: Message) => {
        setMessages(prev => [...prev, message]);
      });

      // Fetch existing messages when component mounts
      fetchMessages();

      return () => {
        socket.off('message');
      };
    }
  }, [socket, currentRoom]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/chat/messages');
      const data = await response.json();
      setMessages(data.reverse()); // Reverse because backend sorts by newest first
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = (content: string) => {
    if (socket && username && content.trim()) {
      const messageData: Message = {
        username,
        content: content.trim(),
        timestamp: new Date(),
        room: currentRoom
      };

      // Emit to socket for real-time updates
      socket.emit('sendMessage', messageData);
    }
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsUsernameSet(true);
    }
  };

  if (!isUsernameSet) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Join Chat</h1>
          <form onSubmit={handleUsernameSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your username:
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your username"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        <header className="bg-white shadow-sm p-4 border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Chat Room</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {username}!</span>
              <span className="text-sm text-gray-500">Room: {currentRoom}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 flex flex-col bg-white">
            <MessageList messages={messages} currentUsername={username} />
            <MessageInput onSendMessage={sendMessage} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;