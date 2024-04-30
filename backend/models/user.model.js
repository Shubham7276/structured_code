const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String, // Assuming you store file paths or URLs in this field
    },
});

const User = mongoose.model('user', userSchema);
module.exports = User;