import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, selectCurrentMessages } from '../../features/slice/chatSlice';
import MessageList from './MessageList';
import MessageInput from './MessageInput';


const ChatContainer = () => { 
  const currentChannelId = useSelector(state => state.chat.currentChannelId);
  const messages = useSelector(selectCurrentMessages);

  const handleSendMessage = ({ text, username }) => {
    dispatch(addMessage({
      id: Date.now(),
      text,
      username,
      channelId: currentChannelId,
      timestamp: new Date().toISOString()
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        
      </div>
      
    </div>
  );
};

export default ChatContainer;
