var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    ChatId: String,
    ChatFromUserId: String,
    ChattoUserId: String,
    ChatTime: Date,
    ChatContent: String,
});

module.exports = mongoose.model('Chat', chatSchema);