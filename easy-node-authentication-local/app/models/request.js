 var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	from_id: String,
    to_id: String,
    req_status: Number //0 = new request, 1 = Accept, 2 = Reject
});

module.exports = mongoose.model('request', commentSchema);


