var mongoose = require('mongoose');

var recommendArtistsSchema = new mongoose.Schema({
    recommendationId: String,
    userId: String,
    recommendArtistIds: {
        type: Map,
        of: String, /* chat, notChat / connect*/
        default: {},
    },
});

module.exports = mongoose.model('RecommendArtists', recommendArtistsSchema);