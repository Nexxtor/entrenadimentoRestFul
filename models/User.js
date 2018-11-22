var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        index: true
    },
    name:{
        type: String,
        required: true
    },
    lastname: String   
});

module.exports = mongoose.model('User',UserSchema);