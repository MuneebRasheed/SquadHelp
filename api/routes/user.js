const express = require('express');

const router = express.Router();

const User = require('../modal/user');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email }).then(use => {
        if (use >= 1) {
            return res.status(200).json({
                message: 'User has already exist'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    });
                    return user.save().then(per => {
                        res.status(200).json(per);
                    }).catch(err => {
                        return res.status(505).json({
                            error: err
                        })
                    })
                }
            })
        }
    })


})



router.delete('/:userId', (req, res, next) => {
    User.remove({
        _id: req.params.id
    }).then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
})


router.post('/login', (req, res, next) => {
    User.find({
        email: req.body.email
    }).then(user => {
        console.log(user)
        if (user.length < 1) {
            return res.status(404).json({
                message: 'Mail not found , user Doesnot exist'
            });
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        password: user[0].password
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        })
                    return res.status(200).json({
                        message: 'Auth succesful',
                        token: token
                    });
                } else {

                    return res.status(401).json({
                        message: "Password does not match"
                    })
                }
            })

        }

    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
})

module.exports = router;
