var User = require('../models/user.js');

exports.subscriber = function (user_id, partner_id){
	// console.dir(partner_id);
	User.update(
	   { _id: user_id },
	   { $push: { partners: partner_id }},
	   { upsert: false },
	   function (err){
		   	if(err){
	                console.log(err);
	        }else{
	                console.log("Successfully added");
	        }
	   }
	)
}

exports.getPartner = function (user_id, done){
	// User.
	my_id, my_friend_ids = user._id, user.friend_ids
	my_friends = db.users.findById({'_id':{'$in': my_friend_ids}, 'friend_ids': my_id})
}

exports.getPlaceInformation = function (email, done ) {
    Place.find({ email : email}, function( err, respon){
    	done(respon);
    });
};

exports.savePlaceInformation = function (req, res) {
	console.dir(req.session.email);
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