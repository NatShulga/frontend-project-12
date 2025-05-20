const http = require('http');
const socketIo = require('socket.io');
const { parse } = require('url');

const server = http.createServer();
const io = socketIo(server);

let messages = [];

// Обработка HTTP запросов
server.on('request', async (req, res) => {
  const { pathname } = parse(req.url);
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && pathname === '/messages') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { text, sender } = JSON.parse(body);
        const message = { text, sender, timestamp: new Date() };
        messages.push(message);
        io.emit('message', message);
        
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(message));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } 
  else if (req.method === 'GET' && pathname === '/messages') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(messages));
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Обработка WebSocket соединений
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Отправка истории сообщений новому клиенту
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
