var User = require('../models/user.js');

exports.getPlaceInformation = function (email, done ) {
    Place.find({ email : email}, function( err, respon){
    	done(respon);
    });
};

exports.getCompanyAPI = function (arr_partners, done ) {
    User.find({_id:{ "$in":  arr_partners }},'companyName address' , function( err, respon){
    	if (err) done(err);
    	done(respon);
    });
};