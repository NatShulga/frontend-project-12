import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../features/slice/chatSlice';

const ChatContainer = ({ }) => {
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

    </div>
  );
};

export default ChatContainer;
