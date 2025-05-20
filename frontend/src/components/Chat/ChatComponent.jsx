import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

class ChatWebSocket {
    constructor(url, onMessage) {
      this.socket = new WebSocket(url);
      this.socket.onmessage = (event) => {
        onMessage(JSON.parse(event.data));
      };
    }
  
    send(message) {
      this.socket.send(JSON.stringify(message));
    }
  
    close() {
      this.socket.close();
    }
  }


const ChatComponent = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new ChatWebSocket(
      'wss://localhost:5002/chat',
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
    <div style={{ }}>
    
    </div>
  );
};

export default ChatComponent;
