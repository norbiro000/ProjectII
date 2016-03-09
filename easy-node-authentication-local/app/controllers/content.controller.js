var Content = require('../models/content.js');

exports.addNewContent = function (req, res ) {
	// console.dir(req.body);
	var con = {"email" : req.session.email,"content" : req.body}	
	var content = new Content();

	console.dir(con.content.title);
	content.email = con.email;
	content.content= {
		title : con.content.title,
		description : con.content.description,
		ttype: con.content.type,
		url: con.content.url,
	}
	content.save(function(err){
		if(err)
			console.log(err);
	});
    res.send("Add new content success.");
};

exports.getContent = function (email, done ) {
    Content.find({ email: email }, function( err, respon){
    	done(err, respon);
    });
};

exports.editContent = function (id, datas, done ) {
	Content.findByIdAndUpdate(id, { 
		$set: { 
			content: {
				title: datas.title,
				description: datas.description,
				ttype: datas.ttype,
				url: datas.url
			}
		}}, function (err, content) {
	  if (err) return handleError(err);
	  done(err, content);
	});
};

exports.deleteContent = function (id, done ) {
	console.dir("DELETE");
    Content.remove({ _id: id }, function( err, respon){
    	done(err, respon);
    });
};