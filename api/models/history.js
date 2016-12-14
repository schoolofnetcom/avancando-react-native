var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
    text:  String,
    time:  Number
});

module.exports = mongoose.model('History', historySchema);