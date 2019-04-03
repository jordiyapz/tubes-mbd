const mongoose = require('mongoose');
const User = mongoose.model('User');
const { userHandler } = require('../handler');
const { listAllUser, addUser, updateUser, getUser, deleteUser } = userHandler;

module.exports = {
    listAllUser,
    addUser,
    getUser,
    updateUser,
    deleteUser
}