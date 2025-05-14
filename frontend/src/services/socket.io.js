import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { io } from 'socket.io-client';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [currentChannelId, setCurrentChannelId] = useState(null);
  const [socket, setSocket] = useState(null);

  // Инициализация сокета
  useEffect(() => {
    const newSocket = io('http://localhost:5002');
    setSocket(newSocket);

    // Подписки на события
    newSocket.on('newMessage', (payload) => {
      console.log('New message:', payload);
      if (payload.channelId === currentChannelId) {
        setMessages(prev => [...prev, payload]);
      }
    });

    newSocket.on('newChannel', (payload) => {
      console.log('New channel:', payload);
      setChannels(prev => [...prev, payload]);
    });

    newSocket.on('removeChannel', (payload) => {
      console.log('Remove channel:', payload);
      setChannels(prev => prev.filter(ch => ch.id !== payload.id));
    });

    newSocket.on('renameChannel', (payload) => {
      console.log('Rename channel:', payload);
      setChannels(prev => prev.map(ch => 
        ch.id === payload.id ? { ...ch, name: payload.name } : ch
      ));
    });

    // Загрузка начальных данных
    newSocket.on('connect', () => {
      console.log('Connected to server');
      // Здесь можно запросить начальные сообщения и каналы
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentChannelId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || !currentChannelId) return;

    socket.emit('newMessage', {
      body: message,
      channelId: currentChannelId,
      username: 'currentUser' // Замените на реальное имя пользователя
    });

    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="channels-list">
        <h4>Channels</h4>
        {channels.map(channel => (
          <div 
            key={channel.id} 
            className={`channel ${channel.id === currentChannelId ? 'active' : ''}`}
            onClick={() => setCurrentChannelId(channel.id)}
          >
            {channel.name}
          </div>
        ))}
      </div>

      <div className="messages-container">
        <div className="messages">
          {messages
            .filter(msg => msg.channelId === currentChannelId)
            .map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.username}:</strong> {msg.body}
              </div>
            ))}
        </div>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={!currentChannelId}
            />
            <Button 
              variant="primary" 
              type="submit"
              disabled={!message.trim() || !currentChannelId}
            >
              Send
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default ChatComponent;
