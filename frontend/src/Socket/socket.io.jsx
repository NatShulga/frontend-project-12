import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { fetchMessages, sendMessageApi } from '../store/api/messagesApi';
import { fetchChannels, getCurrentChannel, removeChannel, renameChannel } from '../store/api/channelsApi';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  const { messages, channels, currentChannelId } = useSelector(state => ({
  messages: state.chat.messages.data,
  channels: state.chat.channels.data,
  currentChannelId: state.chat.currentChannelId,
}));

  const username = useSelector(state => state.auth.username);

  // Инициализация сокета и загрузка данных
  useEffect(() => {
    const newSocket = io('http://localhost:5002', {
      auth: {
        token: localStorage.getItem('token'),
        username: username
      },
        transports: ['websocket']
    });
    
    setSocket(newSocket);


    // Обработчики событий сокета
    const handleNewMessage = (payload) => {
      dispatch(sendMessageApi(payload));
      // Дополнительно перезагружаем сообщения для синхронизации
      dispatch(fetchMessages());
    };

    const handleNewChannel = (payload) => {
      dispatch(sendMessageApi(payload));
      dispatch(fetchChannels()); // для синхронизации с сервером
    };

    const handleRemoveChannel = (payload) => {
      dispatch(removeChannel(payload))
      dispatch(fetchChannels());
    };

    const handleRenameChannel = (payload) => {
      dispatch(renameChannel(payload))
      dispatch(fetchChannels());
    };


    //подписка на события
    newSocket.on('newMessage', handleNewMessage);
    newSocket.on('newChannel', handleNewChannel);
    newSocket.on('removeChannel', handleRemoveChannel);
    newSocket.on('renameChannel', handleRenameChannel);

    //загр.данных при монтировании
    dispatch(fetchChannels()).then(() => {
      if (!currentChannelId && channels.length > 0) {
        dispatch(getCurrentChannel(channels[0].id));
      }
    });
    
    dispatch(fetchMessages());

//отписки от событий
    return () => {
      newSocket.off('newMessage', handleNewMessage);
      newSocket.off('newChannel', handleNewChannel);
      newSocket.off('removeChannel', handleRemoveChannel);
      newSocket.off('renameChannel', handleRenameChannel);
      newSocket.disconnect();
    };
  }, [dispatch, username, currentChannelId, channels]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || !currentChannelId || !username || !socket) return;

    socket.emit('newMessage', {
      body: message,
      channelId: currentChannelId,
      username,
    });

    setMessage('');
  };

  return (
    <div
    className="chat-container"
    style={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}
  >
    <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
      <MessageList messages={messages} />
    </div>

    <MessageInput 
        handleSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
        />
  </div>
  );
};

export default ChatComponent;
