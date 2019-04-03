const mongoose = require('mongoose');
const User = mongoose.model('User');

const listAllUser = (req, res) => {
    User.find({}, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
    })
}

const addUser = (req, res) => {
    User.create(req.body, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
    })
}

const getUser = (req, res) => {
    User.findById(req.params.userID, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
    })
}

const updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userID }, req.body, (err, user, result) => {
        if (err) return res.send(err);
        res.json({ message: 'Update successful!'});
    })
}

const deleteUser = (req, res) => {
    User.findOneAndDelete({ _id: req.params.userID} , (err) => {
        if (err) return res.send(err);
        res.json({ message: 'Delete successful!'});
    })
}

module.exports = {
    listAllUser,
    addUser,
    getUser,
    updateUser,
    deleteUser
}