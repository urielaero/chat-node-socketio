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

//Server http con express
var express = require('express'),
app = express();
app.get('/',function(req,res){
	app.use(express.static(__dirname+'/templates/'));
	res.sendfile(__dirname+'/templates/index.html');
});

console.log('http server up');
app.listen(8080);
