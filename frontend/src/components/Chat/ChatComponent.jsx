import React, { useState, useEffect, useRef } from 'react';
import ChatWebSocket from '../../services/chatWebSocket';
import { Form, InputGroup, Button } from 'react-bootstrap';

const ChatComponent = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new ChatWebSocket(
      'wss://your-websocket-server.com/chat',
      (newMessage) => {
        setMessages(prev => [...prev, newMessage]);
      }
    );

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const message = {
      id: Date.now(),
      text: text,
      timestamp: new Date().toISOString(),
      sender: 'user'
    };

    wsRef.current.send(message);
    setText('');
  };

  return (
    <div style={{ /* ваши стили */ }}>
      {/* Остальной JSX */}
    </div>
  );
};

export default ChatComponent;
