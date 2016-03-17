 var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    owner_id : String,
    email : String,
    content:{
    	ttype : String,
    	service_name : String,
    	url : String,
    	description : String
    },
    price : [{
    	tag : String ,
    	netprice : String,
        maxprice : String
    }],
    tranfer : [{
    	tag : String,
    	price : String,
    }],
});

module.exports = mongoose.model('service', commentSchema);


