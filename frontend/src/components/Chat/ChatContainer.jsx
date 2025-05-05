import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatContainer = ({ username }) => {
  return (
    <div className="d-flex flex-column h-100">
      {/* Блок для сообщений*/}
      <div className="flex-grow-1 overflow-auto">
        <MessageList />
      </div>

      {/* Блок ввода (прижат к низу) */}
      <div className="border-top">
        <MessageInput sender={username} /> {/* Передаем username как отправителя */}
      </div>
    </div>
  );
};

export default ChatContainer;
