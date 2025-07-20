import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

const ChatComponent = () => {
  const [messages, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  const { channels, currentChannelId } = useSelector(state => ({
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
      dispatch(addMessage(payload));
      // Дополнительно перезагружаем сообщения для синхронизации
      dispatch(fetchMessages());
    };

    const handleNewChannel = (payload) => {
      dispatch(addChannel(payload));
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
        dispatch(setCurrentChannel(channels[0].id));
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
  }, [dispatch, username, currentChannelId, channels.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messages.trim() || !currentChannelId || !username || !socket) return;

    socket.emit('newMessage', {
      body: messages,
      channelId: currentChannelId,
      username,
    });

    setMessage('');
  };


  return (
    {}
  );
};

export default ChatComponent;
