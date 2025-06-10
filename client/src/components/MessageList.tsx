import React from 'react';

interface Message {
  id: number;
  text: string;
  sender: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div key={message.id} className="message">
          <strong>{message.sender}: </strong>
          <span>{message.text}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;