var Place = require('../models/myplace.js');

module.exports = function (socket) {
    //clear Interval

    if(interval){
        clearInterval(interval);
    }
    var stream = new Place;

    var currentCount=0;

    var interval = setInterval(function() { 
        Place.count({}, function( err, count){
            if(currentCount != count && count != null){
                currentCount = count;
                console.log("COUNT"+count);
                socket.emit('alert',count);
            }
        });
        console.log("CURRENT" +currentCount);
    }, 1000);

    Place.find({}, function (err, data){
        console.log(data);
        socket.emit('getplace', JSON.stringify(data));
    });

    stream.on('data', function (place) {
        socket.emit('comment.add', place);
    });
    socket.on('disconnect', function (){
        console.log("disconnect");
        clearInterval(interval);
    });
};