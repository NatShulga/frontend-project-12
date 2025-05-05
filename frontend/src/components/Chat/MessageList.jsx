import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentMessages } from '../../features/slice/chatSlice';
import { useTranslation } from 'react-i18next';
import MessageInput from './MessageInput';

const MessageList = () => {
  const { t } = useTranslation();
  const messages = useSelector(selectCurrentMessages);

  return (
    <div className="d-flex flex-column h-100">
      
      <div className="flex-grow-1 overflow-auto p-3">
        {messages.length === 0 ? (
          <div className="text-center text-muted h-100 d-flex align-items-center justify-content-center">
            {t("Нет сообщений")}
          </div>
        ) : (
          messages.map(message => (
            <div key={message.id} className="mb-3">
              <div className="fw-bold">{message.sender}</div>
              <div>{message.text}</div>
              <div className="text-muted small">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-top">
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageList;
