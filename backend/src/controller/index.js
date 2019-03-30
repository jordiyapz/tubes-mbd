const mongoose = require('mongoose');
const User = mongoose.model('User');
const { userHandler } = require('../handler');
const { listAllUser, addUser } = userHandler;

module.exports = {
    listAllUser,
    addUser
}