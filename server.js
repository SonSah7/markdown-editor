const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle Markdown input from clients
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('markdown', (msg) => {
        socket.broadcast.emit('markdown', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3012;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
