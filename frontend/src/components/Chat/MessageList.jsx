import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentMessages } from '../../features/slice/chatSlice';
import { useTranslation } from 'react-i18next';
import MessageInput from './MessageInput';

const MessageList = () => {
  const { t } = useTranslation();
  const messages = useSelector(selectCurrentMessages);
  const currentChannelId = useSelector(state => state.chat.currentChannelId);
  const user = useSelector(state => state.auth.user);
  
  const currentChannel = useSelector(state => 
    state.chat.channels.find(ch => ch.id === currentChannelId)
  );
  const currentChannelName = currentChannel?.name || t('chat.default_channel_name');

  const filteredMessages = messages.filter(
    message => message.channelId === currentChannelId
  );

  return (
    <div className="d-flex flex-column h-100">
      <div className="channel-header p-3">
        <h5 className="m-0">
          <span 
            className="badge ms-1"
            style={{
              backgroundColor: '#4682B4',
              color: 'white',
            }}
          >
            {filteredMessages.length} {t('сообщений')}
          </span>
        </h5>
        {user && (
          <div className="text-muted small">
            Добро пожаловать, <strong>{user.username || user.name || 'Гость'}</strong>!
          </div>
        )}
      </div>
      
      <div className="flex-grow-1 overflow-auto p-3 messages-container"> 
        {filteredMessages.length === 0 ? (
          <div className="text-center text-muted h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="mb-3">
              <i className="bi bi-chat-square-text fs-1"></i>
            </div>
            <h5>{t('нет сообщений')}</h5>
          </div>
        ) : (
          <div className="messages-flow">
            {filteredMessages.map(message => (
              <div key={message.id} className="mb-2">
                <div className="d-flex justify-content-between">
                  <strong className="message-author">{message.author || 'Гость'}</strong>
                  <small className="text-muted">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </small>
                </div>
                <div className="message-text">{message.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3">
        <MessageInput currentChannelId={currentChannelId} />
      </div>
    </div>
  );
};

export default MessageList;
