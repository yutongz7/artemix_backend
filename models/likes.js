var mongoose = require('mongoose');

var likeSchema = new mongoose.Schema({
    likeId: String,
    likeFromUserId: String,
    likedArtIds: {type: [String], default: []},
    artistIdToLikedArts: {
        type: Map,
        of: [String],
        default: {},
    },
});

module.exports = mongoose.model('Like', likeSchema);