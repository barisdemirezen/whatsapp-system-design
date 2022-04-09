require('dotenv').config()
const server = require('http').createServer();
const io = require('socket.io')(server, {cors: {origin: "*"}});
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

io.on('connection', socket => {
    socket.on('message', msg => {
        fetch(`${process.env.ENDPOINT_BASEURL}/receiver/receive`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Message: msg})            
        }).catch(err => console.log(err));
        io.emit('message', msg);
    })
})

server.listen(8080);