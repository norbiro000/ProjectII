var Service = require('../models/service.js');

exports.getService = function (email, done ) {
    Service.find({ email : email}, function( err, respon){
    	done(respon);
    });
};

exports.getServiceById = function (id, done ) {
    Service.find({ _id : id}, function( err, respon){
    	done(respon);
    });
};

exports.saveService = function (data, done ) {
	console.dir("TYPE"+data.body.content.type);
    var service = new Service();
   if(data.user._id)
   		service.owner_id = data.user._id;

   if(data.user.local.email)
   		service.email = data.user.local.email;

   	if(data.body.content){

service.content.ttype = service.content.ttype

	   	if(data.body.content.url)
	   		service.content.url = data.body.content.url;

	   	if(data.body.content.service_name)
	   		service.content.service_name = data.body.content.service_name;

	   	if(data.body.content.description)
	   		service.content.description = data.body.content.description;
   }

   	if(data.body.price)
   		service.price = data.body.price;
   	if(data.body.tranfer)
   		service.tranfer = data.body.tranfer;

   // service:JSON.stringify(data);
    service.save(function(err){
		if(err)
			console.log(err);
		done();
// 		console.dir("saveed");
	});
};

exports.editService = function (req, done ) {
	Service.findOne({ _id:req.params.service_id }, function (err, service){
		if (err) return handleError(err);

		if(req.body.content != undefined || req.body.content !=null)
			service.content = req.body.content;

	  	if(req.body.price || req.body.price != undefined || req.body.price !=null)
	   		service.price = req.body.price;
	   	if(req.body.tranfer || req.body.tranfer != undefined || req.body.tranfer !=null)
	   		service.tranfer = req.body.tranfer;


		service.save(function(err){
			if(err)
				return handleError(err);
			done(service)
		});
	});
};

exports.deleteService = function (req, done ) {
	Service.remove({_id:req.params.service_id}, function (err){
		if(err)
			return done(err)

		done()
	});
};



