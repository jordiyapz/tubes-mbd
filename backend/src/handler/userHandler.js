const mongoose = require('mongoose');
const User = mongoose.model('User');

const listAllUser = (req, res) => {
    User.find({}, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
    })
}

const addUser = (req, res) => {
    const body = req.body;
    const user = new User(body);
    User.create(user, (err, usr) => {
        if (err) return res.send(err);
        res.json(usr);
    })
}

module.exports = {
    listAllUser,
    addUser
}