var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    tagName: String,
    artAddresses: {type: [String], default: []},
});

module.exports = mongoose.model('Tag', tagSchema);