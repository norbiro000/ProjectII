var Voucher = require('../models/voucher.js');

exports.getVoucher = function () {
    Voucher.find({ email : email}, function( err, respon){
    	done(respon);
    });
};

exports.editVoucher = function (email, done ) {
    Voucher.find({ email : email}, function( err, respon){
    	done(respon);
    });
};

exports.insertVoucher = function (req, res) {
	console.dir(req.session.email);
	Voucher.findOne({ email:req.session.email }, function (err, Voucher){
		if (err) return handleError(err);

		if(req.body.price != undefined || req.body.price !=null)
			Voucher.price = req.body.price;
		if(req.body.address != undefined || req.body.address !=null)
			Voucher.address = req.body.address;
		Voucher.save(function(err){
			if(err)
				return handleError(err);

			res.send("Saved");
		});
	});
}

exports.deleteVoucher = function (req, res) {
	console.dir(req.session.email);
	Voucher.findOne({ email:req.session.email }, function (err, Voucher){
		if (err) return handleError(err);

		if(req.body.price != undefined || req.body.price !=null)
			Voucher.price = req.body.price;
		if(req.body.address != undefined || req.body.address !=null)
			Voucher.address = req.body.address;
		Voucher.save(function(err){
			if(err)
				return handleError(err);

			res.send("Saved");
		});
	});
}