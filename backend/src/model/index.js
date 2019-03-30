'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
            default: 0
        }
    }]
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {
    UserModel
}