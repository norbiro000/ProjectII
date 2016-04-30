 var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    operator_email: String,
    agency_email: String,
    createDate: { type: Date, default: Date.now },
    datas: {
        // tourProgram: String,
        // guessName: String,
        // numberOfGuess: Number,
        // date: Date,
        // meetingPoint: String,
        // time: Date,
        // remark: String
    },
    state: Number
});

module.exports = mongoose.model('voucher', commentSchema);


