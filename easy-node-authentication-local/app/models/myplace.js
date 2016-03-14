 var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    owner_id: String,
    email: String,
    placename: String,
    price : {
    	netprice : String ,
    	maxprice : String
    },
    address : {
    	telephone : String,
    	email : String,
        fax : String,
    	province : String,
    	address : String,
    },
});

module.exports = mongoose.model('place', commentSchema);


