var express = require('express'),
    app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    path = require('path'),
    server, io;

var mongoose = require('mongoose');
	mongoose.connect('mongodb://inmy.site/test');
	module.exports = mongoose;



app.get('/', function (req, res) {
   	app.use(express.static(path.join(__dirname, 'public')));
    res.sendFile(__dirname + '/public/main.html');
});


app.get('/getPlaceData', function (req, res){
    var data = require('./models/myplace');
    res.send(JSON.stringify(data.find({ placename : "Tiger Kingdom"})));
});


server = http.Server(app);
server.listen(5000);

io = socketIO(server);

io.on('connection', function (socket) {
    var controllers = ['myplace'];
    for (var i = 0; i<controllers.length; i++) {
        // require('./controllers/' + controllers[i] + '.controller')(socket);
    }
    //SOCKET ON DISCONNECT
});