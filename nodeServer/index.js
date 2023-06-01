// Node Server socket io connection 
const io = require("socket.io")(8000);

users = {};

io.on('connection', socket =>{
    socket.on("user-new-joined", name=>{
        users[socket.id] = name;
        socket.broadcast.emit("user-joined" , name);
    });

    socket.on("send", massage =>{
        socket.broadcast.emit('receive', {massage:massage, name:users[socket.id]});
    });

    socket.on('disconnect', massage =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

});