var mongoose = require('mongoose');

var ArtSchema = new mongoose.Schema({
    artID: String,
    userId: String,
    userName: String,
    artTitle: String,
    artContent: String, // caption
    artAddress: String, // image path
    artTags: {type: [String], default: []},
    width: Number,
    height: Number,
});

module.exports = mongoose.model('Art', ArtSchema);