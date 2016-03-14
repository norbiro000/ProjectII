 var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	owner_id: String,
    email: String,
    content: {
        title: String,
        description: String,
        ttype: String,
        url: String,
    },
});

module.exports = mongoose.model('content', commentSchema);


