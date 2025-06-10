import React, { useEffect, useRef } from 'react';
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
  currentUsername: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUsername }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((message, index) => {
          const isOwnMessage = message.username === currentUsername;
          return (
            <div
              key={message._id || index}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isOwnMessage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
                  }`}
              >
                {!isOwnMessage && (
                  <p className="text-xs font-semibold mb-1 text-gray-600">
                    {message.username}
                  </p>
                )}
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                    }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;