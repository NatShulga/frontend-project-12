import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../features/slice/chatSlice';

const ChatContainer = ({ username }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(state => state.chat.currentChannelId);

  const handleSendMessage = ({ text, sender }) => {
    dispatch(addMessage({
      text,
      sender,
      channelId: currentChannelId,
    }));
  };

  return (
    <div className="d-flex flex-column h-100">
      {/* Блок для сообщений */}
      <div className="flex-grow-1 overflow-auto">
        <MessageList />
      </div>

      {/* Блок ввода должен быть прижат к низу*/}
      <div className="border-top">
        <MessageInput onSendMessage={handleSendMessage} sender={username} />
      </div>
    </div>
  );
};

export default ChatContainer;
