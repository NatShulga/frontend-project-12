const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let messages = []; // Хранение сообщений

app.use(express.json());

// Эндпоинт для отправки сообщений
app.post('/messages', (req, res) => {
    const { text, sender } = req.body;
    const message = { text, sender, timestamp: new Date() };
    messages.push(message);
    io.emit('message', message); // Отправка сообщения всем подключенным клиентам
    res.status(201).json(message);
});

// Эндпоинт для получения сообщений
app.get('/messages', (req, res) => {
    res.json(messages);
});

// Обработка WebSocket соединений
io.on('connection', (socket) => {
    console.log('A user connected');

    // Отправка существующих сообщений при подключении нового пользователя
    socket.emit('loadMessages', messages);

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
