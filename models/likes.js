var mongoose = require('mongoose');

var likeSchema = new mongoose.Schema({
    likeId: String,
    likeFromUserId: String,
    likedArtIds: Array,
    artistIdToLikeCount: {
        type: Map,
        default: {},
    },
});

module.exports = mongoose.model('Like', likeSchema);