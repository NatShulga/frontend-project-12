import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../features/slice/chatSlice';

const ChatContainer = ({ }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(state => state.chat.currentChannelId);

  const handleSendMessage = ({ text, username }) => {
    dispatch(addMessage({
      text,
      username,
      channelId: currentChannelId,
    }));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }}>
      { }
      
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <MessageList messages={messages} />
      </div>
      
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
