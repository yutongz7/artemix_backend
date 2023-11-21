var mongoose = require('mongoose');

var likeSchema = new mongoose.Schema({
    likeId: String,
    likeFromUserId: String,
    likeToArtId: String,
});

module.exports = mongoose.model('Like', likeSchema);