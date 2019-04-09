const mongoose = require('mongoose');
const User = mongoose.model('User');
const Customer = mongoose.model('Customer');
const bcrypt = require('bcrypt');

const signupCustomer = (req, res, next) => {
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
                                        
                    bcrypt.hash(body.password, parseInt(process.env.SALT) || 10, (err, hash) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ error: err });
                        }
                        
                        const {username, email, phoneNumber} = body;
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username, 
                            email, 
                            phoneNumber,
                            password: hash,                            
                        });
                        user.roles.push('Customer');
                        user.save()
                            .catch(error => {
                                console.log(error);
                                res.status(500).json({ error:error });
                            });               
                        const customer = new Customer({
                            userId: user._id
                        }).save().then(result => {
                            console.log(result);
                            res.status(201).json({ message: 'Signup Successful' });
                        }).catch(error => {
                            console.log(error);
                            res.status(500).json({ error:error });
                        });
                    });                    
                })
        });
}

const signupExistingCustomer = (req, res, next) => {
    const body = req.body;
    const {input} = body;
    let finder;
    if (
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(input)
    ) finder = User.find({ email: input });
    else finder = User.find({ username: input });
    
    finder.exec().then(
        user => {
            if (user.length == 0) return res.status(404).json({ message: 'User not found' });
            else {
                bcrypt.compare(body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(500).json({ result, err });
                    }
                    if (result) {
                        if (user[0].roles.includes('Customer')) 
                            return res.status(409).json({ message: 'Already signed up'})
                        else {
                            user[0].roles.push('Customer');                           
                            const customer = new Customer({
                                userId: user[0]._id
                            });
                            customer.save()
                                .then(result => {
                                    user[0].save().catch(error => {
                                        console.log(error);
                                        res.status(500).json({ error:error });
                                    });
                                    console.log(result);
                                    res.status(201).json({ message: 'Signup Successful' });
                                })
                                .catch(error => {
                                    console.log(error);
                                    res.status(500).json({ error:error });
                                }); 
                        }
                    } else
                        return res.status(404).json({ message: 'User not found' })
                })
            }
        }
    ).catch(err => {
        return res.status(500).json({ error: err });
    });
    
}

module.exports = {
    signupCustomer,
    signupExistingCustomer
}

