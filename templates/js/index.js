$(function(){
	//La ip del server de socket io
	var socket = io.connect('http://192.168.25.38:8000');

	socket.on('connect',function(){
		socket.emit('usuarioNuevoServer',prompt("ingresa un nick: "));
	});

	$('#msg-input input').keypress(function(e){
		var $this = $(this);
		if(e.which == 13){
			socket.emit('mensajeAlServer',$this.val());
			$this.val('');
		}
	});

	socket.on('mensajeAlCliente',function(nick,msg){
		var html = '<div><b>'+nick+':</b>'+msg;
		$("#messages").append(html);

	});

	socket.on("usuarioNuevosCliente", function(nicks) {
		$("#users").html('');
			for (var i = 0; i < nicks.length; i++) {
				$("#users").append('<li>'+nicks[i]+'</li>');
		}
	});

});
