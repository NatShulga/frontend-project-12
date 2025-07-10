import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessagesLoading, selectMessagesError } from '../../features/slice/chatSlice';
import { fetchMessages } from '../../store/api/messagesApi';
import { useTranslation } from 'react-i18next';
import ProfanityFilter from 'leo-profanity';


const cleanText = (text) => {
  if (!text) return text;
  return ProfanityFilter.clean(text, '****');
};

const MessageList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const messages = useSelector(state => {
  const currentChannelId = state.channels.currentChannelId;
  return state.messages.messages.filter(msg => msg.channelId === currentChannelId);
});
  const isLoading = useSelector(selectMessagesLoading);
  const error = useSelector(selectMessagesError);
  const currentChannelId = useSelector(state => state.chat.currentChannelId);
  const username = useSelector((state) => state.auth.username);


  //отладка, проверка загруженных сообщений
  useEffect(() => {
    dispatch(fetchMessages('token'))// ???
    console.log('Текущие сообщения:', messages);
    console.log('Текущий channelId:', currentChannelId);
  }, [dispatch, currentChannelId]);


  const filteredMessages = Array.isArray(messages) 
    ? messages.filter(message => message.channelId === currentChannelId)
    : [];

  return (
  <div className="d-flex flex-column h-100" style={{ position: 'relative' }}>
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
    </div>
    
    <div 
      className="mb-4 p-3 small messages-container"
      style={{ 
        minHeight: 0,
        height: '65%',
        willChange: 'transform',
        overflow: 'hidden auto',
        paddingBottom: '80px',
        backgroundColor: 'white',
      }}
    > 
      {filteredMessages.length === 0 ? (
        <div className="text-center text-muted h-100 d-flex flex-column align-items-center justify-content-center">
          <div className="mb-3">
            <i className="bi bi-chat-square-text fs-1"></i>
          </div>
          
        </div>
      ) : (
        <div className="messages-flow">
          {filteredMessages.map(messages => {
            // Проверка, является ли автор сообщения текущим пользователем, упрощенная
            const isCurrentUser = username === messages.username;
            const displayName = cleanText(messages.username);
            
            return (
              <div 
                key={messages.id} 
                className={`mb-2 ${isCurrentUser ? 'current-user-message' : ''}`}
              >
                <div className="d-flex justify-content-between">
                  <strong className="message-username">
                    {displayName}
                  </strong>
                  <small className="text-muted">
                    {new Date(messages.timestamp).toLocaleTimeString()}
                  </small>
                </div>
                <div className="message-text">
                  {cleanText(messages.text)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>

    <div 
      className="p-3"
      style={{
        position: 'sticky',
        bottom: 0,
      }}
    >
    </div>
  </div>
);
};

export default MessageList;
