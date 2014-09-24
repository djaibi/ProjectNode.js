//load what we need

var socketio = require('socket.io'); 
var io;

//to save users connected
var	users = {};

// load up the chat model
var Chat       		= require('../app/models/chat');

exports.listen = function(server){
	io = socketio.listen(server);
	io.sockets.on('connection', function(socket){
		
		//emit the 8 last messages
		var query = Chat.find({});
		query.sort('-created').limit(8).exec(function(err, docs){
			if(err) throw err;
			socket.emit('load old msgs', docs);
		});
		
		//Check if the nickname is already used, if not set up the socket and update the users list
		socket.on('new user', function(data, callback){
			if (data in users){
				callback(false);
			} else{
				callback(true);
				socket.nickname = data;
				users[socket.nickname] = socket;
				updateNicknames();
			}
		});
		
		//Emit the new users list
		function updateNicknames(){
			io.sockets.emit('usernames', Object.keys(users));
		}

		socket.on('send message', function(data, callback){
			var msg = data.trim();
			console.log('after trimming message is: ' + msg);

			//check if the message is a whisper
			if(msg.substr(0,3) === '/w '){
				msg = msg.substr(3);
				var ind = msg.indexOf(' ');
				if(ind !== -1){
					var name = msg.substring(0, ind); //catch the nickname
					var msg = msg.substring(ind + 1);	//cath the msg
					if(name in users){
						
						users[socket.nickname].emit('whisper', {msg: msg, nick: name, word: "To"}); 
						users[name].emit('whisper', {msg: msg, nick: socket.nickname, word: "From"});

						console.log('message sent is: ' + msg);
						console.log('Whisper!');
					} else{
						callback('Error!  Enter a valid user.');
					}
				} else{
					callback('Error!  Please enter a message for your whisper.');
				}
			//if not a whisper i.e a broacast msg
			} else{
				var newMsg = new Chat({msg: msg, nick: socket.nickname});
				newMsg.save(function(err){
					if(err) throw err;
					io.sockets.emit('new message', {msg: msg, nick: socket.nickname});
				});
			}
		});
		
		socket.on('disconnect', function(data){
			if(!socket.nickname) return;
			delete users[socket.nickname];
			updateNicknames();
		});
	});
}