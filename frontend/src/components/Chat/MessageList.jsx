import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentMessages, setCurrentChannel } from '../../features/slice/chatSlice';
import { useTranslation } from 'react-i18next';
import MessageInput from './MessageInput';

const MessageList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const messages = useSelector(selectCurrentMessages);
  const currentChannelId = useSelector(state => state.chat.currentChannelId);
  
  // Определяется название канала куда тыкаем
  const currentChannelName = currentChannelId;

  // Отладка
  console.log('Current channel ID:', currentChannelId);
  console.log('Messages:', messages);
  console.log('Current channel name:', currentChannelName);


  return (
    <div className="d-flex flex-column h-100">
    
      
      <div className="flex-grow-1 overflow-auto p-3">
        {messages.length === 0 ? (
          <div className="text-center text-muted h-100 d-flex align-items-center justify-content-center">
            
          </div>
        ) : (
          messages.map(message => (
            <div key={message.id} className="mb-3">
              
              
              <div className="text-muted small">
                
              </div>
            </div>
          ))
        )}
      </div>

      
    </div>
  );
};

export default MessageList;
