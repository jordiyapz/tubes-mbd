const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    birthdate: Date,
    phoneNumber: {
        type: String,
        required: true
    },
    address: [{
        lists: [{
            country: String,
            city: String,
            street: String,
            zipcode: String
        }],
        primary: {
            type: Number,
            default: -1
        }
    }]
});

module.exports = mongoose.model('User', userSchema);