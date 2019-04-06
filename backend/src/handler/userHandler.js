const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

const listAllUser = (req, res, next) => {
    User.find({}, (err, user) => {
        if (err) return res.send(err);
        res.status(200).json(user);
    })
}

const addUser = (req, res, next) => {
    User.create(req.body, (err, user) => {
        if (err) return res.send(err);
        res.status(200).json({
            message: "User created!"
        });
    })
}

const getUser = (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) return res.send(err);
        res.status(200).json(user);
    })
}

const updateUser = (req, res, next) => {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, (err, user, result) => {
        if (err) return res.send(err);
        res.status(200).json({ message: 'Update successful!'});
    })
}

const deleteUser = (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.userId} , (err) => {
        if (err) return res.send(err);
        res.status(200).json({ message: 'Delete successful!'});
    })
}

const signup = (req, res, next) => {
    const body = req.body;
    const { username, email } = body;
    // User.find({ $or:[{username, email}] })
    User.find({ username }).exec()
        .then(user => {
            if(user.length > 0) return res.status(409).json({
                message: 'Username already exist!'
            })
            User.find({ email }).exec()
                .then(user => {
                    if (user.length > 0) return res.status(409).json({
                        message: 'Email already used!'
                    })
                                        
                    bcrypt.hash(body.password, process.env.SALT || 10, (err, hash) => {
                        if (err) return res.status(500).json({error: err});
                        const {username, email, phoneNumber} = body;
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username, 
                            email, 
                            phoneNumber,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({ message: 'User created' });
                            })
                            .catch(error => {
                                console.log(error);
                                res.status(500).json({ error });
                            });                        
                    });                    
                })
        });


    

}

module.exports = {
    listAllUser,
    addUser,
    getUser,
    updateUser,
    deleteUser,
    signup
}