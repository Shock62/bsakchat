const io = require('socket.io')(3000);

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        if(message != null && message != ""){
            socket.broadcast.emit('chat-message', {message : message, name: users[socket.id]})
        } 
    })

    socket.on('disconnect', () => {
        if (users[socket.id] != null){
            socket.broadcast.emit('user-disconnected', users[socket.id])
            delete users[socket.id]
        }

    })
})
