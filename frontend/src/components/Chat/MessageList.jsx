import React, { useTransition } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentMessages } from '../../features/slice/chatSlice';
import { useTranslation } from 'react-i18next';
import MessageInput from './MessageInput';


const MessageList = () => {
  const {t} = useTransition();
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
