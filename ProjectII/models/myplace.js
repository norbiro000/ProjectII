 var mongoose = require('../server');

var commentSchema = mongoose.Schema({
    placename: String,
    price : [{
    	netprice : String ,
    	maxprice : String
    }],
    contents : [{
    	th : String
    }],
    address : [{
    	telephone : String,
    	email : String,
        fax : String,
    	province : String,
    	address : String,
    }],
});

module.exports = mongoose.model('Cats', commentSchema);


