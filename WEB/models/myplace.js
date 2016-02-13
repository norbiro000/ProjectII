 var mongoose = require('../server');

var commentSchema = mongoose.Schema({
    placename: String,
    price : [{
    	netprice : String ,
    	maxprice : String
    }],
    contents : [{
    	String : String
    }],
    items : [{
        image : String,
        title : String,
        description : String
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


