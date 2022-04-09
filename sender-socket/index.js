require('dotenv').config()
const server = require('http').createServer();
const io = require('socket.io')(server, {cors: {origin: "*"}});

io.on('connection', socket => {
    socket.on('send-message', msg => {
        io.emit('message', msg);
    })
})

server.listen(8081);