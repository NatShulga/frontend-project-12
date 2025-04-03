import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentMessages } from '../../features/chat/chatSlice';

const MessageList = () => {
  const messages = useSelector(selectCurrentMessages);

  return (
    <div className="flex-grow-1 overflow-auto p-3">
      {messages.map(message => (
        <div key={message.id} className="mb-3">
          <div className="fw-bold">{message.sender}</div>
          <div>{message.text}</div>
          <div className="text-muted small">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;