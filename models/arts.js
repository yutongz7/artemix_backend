var mongoose = require('mongoose');

var ArtSchema = new mongoose.Schema({
    artID: String,
    userId: String,
    userName: String,
    artTitle: String,
    artContent: String,
    artAddress: String,
    artTags: {type: [String], default: []},
});

module.exports = mongoose.model('Art', ArtSchema);