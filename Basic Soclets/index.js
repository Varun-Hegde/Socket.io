const express = require('express');
const app = express();
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);
io.on('connection',(socket)=>{
    socket.emit('messageFromServer',{data:"Welcome to the socketio server"});
    socket.on('messageToServer',(dataFromClient)=>{
        console.log(dataFromClient)
    })
    socket.on('newMessageToServer',(msg)=>{
        // console.log(msg)
        io.emit('messageToClients',{text:msg.text})
    })
})


/* 
socket.emit('message', "this is a test");                               //sending to sender-client only
socket.broadcast.emit('message', "this is a test");                     //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game');               //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game');                    //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only');    //sending to individual socketid
io.emit('message', "this is a test");                                   //sending to all clients, include sender
io.in('game').emit('message', 'cool game');                             //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg');                             //sending to all clients in namespace 'myNamespace', include sender
socket.emit();                                                          //send to all connected clients
socket.broadcast.emit();                                                //send to all connected clients except the one that sent the message
socket.on();                                                            //event listener, can be called on client to execute on server
io.sockets.socket();                                                    //for emiting to specific clients
io.sockets.emit();                                                      //send to all connected clients (same as socket.emit)
io.sockets.on() ;                                                       //initial connection from a client. 
*/

/*
socket.emit will send back message to sender only,
io.emit will send message to all the client including sender
if you want to send message to all but not back to sender then socket.broadcast.emit
*/