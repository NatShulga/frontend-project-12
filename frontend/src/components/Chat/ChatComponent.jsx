import React, { useState, useEffect, useRef } from 'react';


class ChatWebSocket {
    constructor(url, onMessage) {
        //обработка ошибок
        this.socket = new WebSocket(url);
        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        this.socket.onmessage = (event) => {
            try {
                onMessage(JSON.parse(event.data));
            } catch (err) {
                console.error('Message parsing error:', err);
            }
        };
    }
    send(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        }
    }

    close() {
        if (this.socket) {
            this.socket.close();
        }
    }
}


const ChatComponent = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new ChatWebSocket(
      'wss://localhost:5000/chat',
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
      username: 'username'
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
