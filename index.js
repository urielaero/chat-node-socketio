//Este es el server

//server socket
var io = require('socket.io').listen(8000)
, nicks = [];
io.sockets.on('connection',function(socket){
	socket.on('usuarioNuevoServer',function(nick){
		nicks.push(nick);
		io.sockets.emit('usuarioNuevosCliente',nicks);
		
		socket.on('mensajeAlServer',function(msg){
			io.sockets.emit('mensajeAlCliente',nick,msg);
		});

		socket.on('disconnect',function(){
			nicks.splice(nicks.indexOf(nick),1);
			io.sockets.emit('usuarioNuevosCliente',nicks);
		})
	});
});

//server http
var connect = require('connect');
connect.createServer(
	connect.static(__dirname+'/templates/');
	console.log('http server up');
).listen(8080);
