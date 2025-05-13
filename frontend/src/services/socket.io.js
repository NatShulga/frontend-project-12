import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { Button, Form, InputGroup } from 'react-bootstrap';

const socket = io('http://localhost:5002'); // Подключение к серверу WebSocket

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

// Получение сообщений
socket.on('loadMessages', (messages) => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.sender}: ${message.text}`;
        messagesDiv.appendChild(messageElement);
    });
});

// Получение новых сообщений
socket.on('message', (message) => {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.sender}: ${message.text}`;
    messagesDiv.appendChild(messageElement);
});

// Отправка сообщения
document.getElementById('sendButton').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value;
    const sender = 'User'; // Замените на имя пользователя

    fetch('/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: messageText, sender }),
    })
    .then(response => response.json())
    .then(data => {
        messageInput.value = ''; // Очистка поля ввода
    });
});

export default socket;
