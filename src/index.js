require('dotenv').config();

const port = process.env.PORT || 8001;
const front = process.env.FRONTEND;

const io = require('socket.io')(port,{
    cors: {
        origin: front,
    },
});

let users = [];

const addUser = (userId,socketId)=>{
    !users.some((user) => user.userId === userId) &&
        users.push({ userId,socketId });
};

const removeUser = (socketId)=>{
    let params = [];
    users.map(user=>{
        if (user.socketId !== socketId) {
            params.push(user);
        };
    });
    users = params;
    //users = users.filter(user=>user.socketId !== socketId);
};

io.on("connection",(socket)=>{
    console.log('new connection');
    io.emit('welcome','hello this web sockets');
    // socket.on("addUser", userId=>{
    //     addUser(userId,socket.id);
    //     io.emit('getUsers', users);
    // });
    socket.on("createGoal", section=>{
        io.emit('newGoal', section);
    });

    socket.on("createSale",section=>{
        io.emit('newSale',section);
    });

    socket.on("createSaleUser",id=>{
        io.emit('newSaleUser',id);
    });

    socket.on("createSaleProduct",product=>{
        io.emit('newSaleProduct',product);
    });

    socket.on("sendFile",id=>{
        io.emit('reciveFile',id);
    });

    // socket.on("disconnect",()=>{
    //     console.log("user disconnected");
    //     removeUser(socket.id);
    //     io.emit('getUsers', users);
    // });
});