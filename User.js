const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    birhday: Date
});

const User = mongoose.model('User', UserSchema);

module.exports = User;