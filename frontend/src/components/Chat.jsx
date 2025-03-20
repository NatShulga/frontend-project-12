import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function Chat() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
        navigate('/login');
        }
    }, [navigate]);

return (
    <div>
        <h2>Чат</h2>
        <p>Добро пожаловать в чат</p>
    </div>
)
};

export default Chat;