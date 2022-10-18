const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let color = '#000000';
let size = 11;
let text = "";

app.get('/', function(req, res){
    res.sendFile(__dirname + '/textEditor.html');
});
io.on('connection', (socket) => {
    socket.emit('textUpdated', text)
    socket.emit('sizeEdit', size)
    socket.emit('colorEdit', color)
    socket.on('textChange', function (newText) {
        if (typeof newText !== 'string') {
            return;
        }
        text = newText;
        io.emit('textUpdated', text)
    })
    socket.on('sizeAdd', function() {
        size++;
        io.emit('sizeEdit', size);
    })
    socket.on('sizeMinus', function() {
        size--;
        io.emit('sizeEdit', size);
    })
    socket.on('colorChange', function(newColor) {
        color = newColor;
        io.emit('colorEdit', color);
    })
});
server.listen(5000, function(){
    console.log('listening on *:5000');
    io.emit('textUpdated', text)
    io.emit('sizeEdit', size)
    io.emit('colorEdit', color)
});

