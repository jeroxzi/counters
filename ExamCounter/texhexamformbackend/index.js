const express = require("express");
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

const server = http.createServer(app);
const io = new Server(server);

let counter = 0;

io.on('connection', (socket) => {
    console.log('Connected');

   
    socket.emit('updateCounter', counter);

    socket.on('increment', () => {
        counter++;
       
        io.emit('updateCounter', counter);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
