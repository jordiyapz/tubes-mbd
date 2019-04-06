const mongoose = require('mongoose');
const User = mongoose.model('User');
const { userHandler } = require('../handler');
const { listAllUser, addUser, updateUser, getUser, deleteUser, signup } = userHandler;

module.exports = {
    listAllUser,
    addUser,
    getUser,
    updateUser,
    deleteUser,
    signup
}