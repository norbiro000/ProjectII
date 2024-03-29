var express = require('express'),
    app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    path = require('path'),
    bodyParser = require('body-parser'),
    server, io;

var address = require('./config/config.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();  

var mongoose = require('mongoose');
	mongoose.connect('mongodb://'+address.ServerURL+'/test');
	module.exports = mongoose;

var Place = require('./models/myplace')
router.route('/place')
    .get(function(req, res) {
        Place.find(function(err, Place) {
            if (err)
                res.send(err);
            res.json(Place);
        });

    });


router.route('/placecontent/')
    .post(function (req, res){
        console.dir(req.body);
        res.send("I Got it");
    });

router.route('/place/:place_id')
    .get(function(req, res) {
        Place.findById(req.params.place_id, function(err, place) {
            if (err)
                res.send(err);
            res.json(place);
        });
    })
    .put(function (req, res){
        Place.findById(req.params.place_id, function(err, place) {
            if (err)
                res.send(err);

            var placeData = ["placename","price","contents","items","address"];

            for(var i=0; i<placeData.length ;i++){
                if(req.body[placeData[i]] != undefined || req.body[placeData[i]] != null){
                    place[placeData[i]] = req.body[placeData[i]];
                }
            }

            place.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Bear updated!' });
            });

        });
    });


app.use('/api', router);


app.get('/', function (req, res) {
   	app.use(express.static(path.join(__dirname, 'public')));
    res.sendFile(__dirname + '/public/main.html');
});


server = http.Server(app);
server.listen(address.Port);

io = socketIO(server);

io.on('connection', function (socket) {
    var controllers = ['myplace'];
    for (var i = 0; i<controllers.length; i++) {
        // require('./controllers/' + controllers[i] + '.controller')(socket);
    }
    //SOCKET ON DISCONNECT
});