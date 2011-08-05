var express = require('express'),
		sys = require('sys'),
		fs = require('fs'),
		iosocket = require('socket.io');
		
var clients = [];

var server = express.createServer();

var io = iosocket.listen(server);

io.sockets.on('connection', function(socket) {
	socket.emit('message', {hello: 'world'});
	console.log('connection');
});//eo on.connection
/*
iosocket.sockets.on('connection', function(client){
	console.log("connection - backend");
	var username;
	
	client.send('Welcome to this socket.io chat server.');
	client.send('Please input your username');

	client.on('message', function(message) {
		console.log("message received - backend");
		console.log(message);
		if (!username) {
			username = message;
			client.send('Welcome, ' + username + '.');
			return;			
		}
		console.log("about to emit");
		//console.log(socket);
		socket.emit('message', {'test': message });
		return;
		//socket.send(message);
		//client.send(username + ' : ' + message);
	});
});
*/
server.listen(8000);