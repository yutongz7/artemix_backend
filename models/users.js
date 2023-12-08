var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    userPassword: String,
    userEmail: String,
    userPhone: String,
    userProfileImgAddress: String,
    userPreferenceTags: {type: [String], default: []},
    tags: {type: [String], default: []},
});

module.exports = mongoose.model('User', UserSchema);