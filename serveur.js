const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let value = 0;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/accueil.html');
});
io.on('connection', (socket) => {
    socket.emit('updateValue', value);
    socket.on('increment', function () {
        value += 1;
        io.emit('updateValue', value);
    })
    socket.on('decrement', function () {
        value -= 1;
        io.emit('updateValue', value);
    })
    socket.on('raz', function () {
        value = 0;
        io.emit('updateValue', value);
    })
});
server.listen(3000, function(){
    console.log('listening on *:3000');
});

