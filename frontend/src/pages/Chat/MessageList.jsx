import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ProfanityFilter from 'leo-profanity';
import { getCurrentChannelId } from '../../store/slice/channelsSlice';


const cleanText = (text) => {
  if (!text) return text;
  return ProfanityFilter.clean(text, '****');
};

const MessageList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();


  //получение данных из редукс стора
  const currentChannelId = useSelector(getCurrentChannelId);
  const username = useSelector(state => state.auth.username);
  const rendMessages = useSelector(state => state.messages);
  const messages = rendMessages.messages.filter((message) => message.channelId === currentChannelId);
  
  
  return (
  <div className="d-flex flex-column h-100" style={{ position: 'relative' }}>
    <div className="channel-header p-3">
      <h5 className="m-0" style={{ fontSize: '0.9rem', color: '#6c757d' }}>
          {messages.length} {t('сообщений')}
      </h5>
    </div>
    
    <div 
      className="mb-4 p-3 small messages-container"
      style={{ 
        minHeight: 0,
        height: '55%',
        willChange: 'transform',
        overflow: 'hidden auto',
        paddingBottom: '80px',
        backgroundColor: 'white',
      }}
    > 
      {messages.length === 0 ? (
        <div className="text-center text-muted h-100 d-flex flex-column align-items-center justify-content-center">
          <div className="mb-3">
            <i className="bi bi-chat-square-text fs-1"></i>
          </div>
          
        </div>
      ) : (
        <div className="messages-flow">
          {messages.map(message => {
            // Проверка, является ли автор сообщения текущим пользователем, упрощенная
            const isCurrentUser = username === message.username;
            const displayName = message.username || 'Unknown';
            
            return (
              <div key={message.id} className={`mb-2 ${isCurrentUser ? 'current-user-message' : ''}`}>
                <div className="d-flex justify-content-between">
                  <strong className="message-username">
                    {displayName}
                  </strong>
                  <small className="text-muted">
                    {new Date(message.timestamp || Date.now()).toLocaleTimeString()}
                  </small>
                </div>
                <div className="message-text">
                  {cleanText(message.body)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>

    <div 
      className=""
      style={{
        
      }}
    >
    </div>
  </div>
);
};

export default MessageList;
