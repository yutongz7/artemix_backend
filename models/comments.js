var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    commentId: String,
    commentFromUserId: String,
    commentToArtId: String,
    commentContent: String,
});

module.exports = mongoose.model('Comment', commentSchema);