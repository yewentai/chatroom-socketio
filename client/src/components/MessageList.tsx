import React from 'react';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list overflow-y-auto h-full">
      {messages.map((message) => (
        <div key={message.id} className="message p-2 border-b">
          <span className="font-bold">{message.user}: </span>
          <span>{message.content}</span>
          <span className="text-gray-500 text-sm ml-2">{message.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;