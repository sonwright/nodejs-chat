var http 	= require('http')
		,sys 	= require('sys')
		,fs 	= require('fs')
		,ws		= require('./ws.js');
		
var clients = [];

http.createServer(function(request, response) {
	response.writeHead(200, {
		'Content-Type' : 'text/html'
	});
	console.log('http.createServer');
	console.log('dirname : ' + __dirname);
	var rs = fs.createReadStream(__dirname + '/template.html');
	sys.pump(rs, response);
	
}).listen(8000);

ws.createServer(function(websocket) {

	var username;
	
	websocket.on('connect', function(resource) {
		clients.push(websocket);
		websocket.write('Welcome to this chat server');
		websocket.write("Please input your username");
	});
	
	websocket.on('data', function(data){
		if (!username) {
			username = data.toString();
			websocket.write("Welcome, " + username + "!");
			
			clients.forEach(function(client) {
				client.write(username + " has joined the channel.");
			});
			return; //returns so rest of channel doesn't see new user typing in their name.
		}
		
		if (data.toString() == "/quit") {
				clients.forEach(function(client) {
				client.write(username + " has quit the channel.");
			});
			websocket.end();
			return; //returns so rest of channel doesn't see new user typing in their name.
		}
		
		var feedback = username + " : " + data.toString() + "\n";
		
		//Foreach loop that goes through anyone connected and writes data
		clients.forEach(function(client) {
			client.write(feedback);
		});
		
	});
	
	websocket.on('close', function() {
		var pos = clients.indexOf(websocket);
		if (pos >= 0) {
			clients.splice(pos, 1);
		}
	});
}).listen(8001);