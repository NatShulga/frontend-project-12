import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectChatResetFlag } from '../../features/authSlice';

class ChatWebSocket {
    constructor(url, onMessage) {
        this.socket = new WebSocket(url);
        
        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        
        this.socket.onopen = () => {
            console.log('WebSocket connected');
        };
        
        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessage(data);
            } catch (err) {
                console.error('Message parsing error:', err);
            }
        };
    }
    
    send(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket is not open');
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
    const resetFlag = useSelector(selectChatResetFlag);
    const username = useSelector(state => state.auth.username); // Добавлено получение username

    useEffect(() => {
        // Инициализация WebSocket
        wsRef.current = new ChatWebSocket('ws://your-websocket-url', (message) => {
            setMessages(prev => [...prev, message]);
            setIsConnected(true);
        });

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    useEffect(() => {
        if (resetFlag) {
            setMessages([]);
        }
    }, [resetFlag]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        const message = {
            id: Date.now(),
            text: text,
            timestamp: new Date().toISOString(),
            username: username // Используем реальное имя пользователя
        };

        if (wsRef.current) {
            wsRef.current.send(message);
        }
        setText('');
    };

    return (
        <div style={{ /* ваши стили */ }}>

        </div>
    );
};

export default ChatComponent;