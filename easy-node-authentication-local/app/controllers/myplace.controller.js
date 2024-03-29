var Place = require('../models/myplace.js');

exports.getPlaceInformation = function (email, done ) {
    Place.find({ email : email}, function( err, respon){
    	done(respon);
    });
};

exports.savePlaceInformation = function (req, res) {
	console.dir(req.user.email);
	Place.findOne({ email:req.session.email }, function (err, place){
		if (err) return handleError(err);

		if(req.body.price != undefined || req.body.price !=null)
			place.price = req.body.price;
		if(req.body.address != undefined || req.body.address !=null)
			place.address = req.body.address;


		place.save(function(err){
			if(err)
				return handleError(err);

			res.send("Saved");
		});
	});
}

exports.getPlaceAPI = function (arr_, done ) {
	console.dir(arr_);
    Place.find({ owner_id : { "$in":  arr_ }}, function( err, respon){
    	if (err) done(err);
    	done(respon);
    });
};