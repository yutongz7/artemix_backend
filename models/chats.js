var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    ChatId: String,
    CurrUserId: String,
    ArtistIdToChats: Map,
});

module.exports = mongoose.model('Chat', chatSchema);