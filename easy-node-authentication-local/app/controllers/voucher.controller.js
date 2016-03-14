var Voucher = require('../models/voucher.js');

exports.getVoucher = function (email, done) {
	// var voucher = new Voucher({
	// 	operator_email: "asdf",
	//     agency_email: "phuketdream",
	//     datas: {
	//         tourProgram: "Tiger Kingdome",
	//         guessName: "Mr.Frank",
	//         numberOfGuess: "2",
	//         date: Date.now(),
	//         meetingPoint: "Esso Kathu",
	//         time: Date.now(),
	//         remark: "none"
	//     },
	//     state: 0
	// });

	// voucher.save(function (err) {
	//   if (err) 
	//   	console.dir(err);

	//   // saved!
	//   console.dir("Saves");
	// })
    Voucher.find({operator_email: email}, function( err, respon){
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

exports.setStateVoucher = function (voucher_id, state, done){
	Voucher.findOne({ _id:voucher_id }, function (err, voucher){
		if (err) return handleError(err);
		voucher.state = parseInt(state);
		voucher.save( function (err) {
			if(err)
				return false

			done(voucher);
		});
	});
}