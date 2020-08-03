const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret; 
const User = require('../../model/User');

/**
 * @route POST api/users/register
 * @desc Register the user
 * @access Public
 */

router.post('/register', (req, res) => {
    let {
        email,
        password, 
        confirm_password 
    } = req.body
    if(password !== confirm_password) {
        return res.status(400).json({
            msg: "Password does not match."
        });
    }
    // Check for unique email
    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Email already in use."
            });
        }
    });
    // Register new user
    let newUser =  new User({
        email,
        password
    });
    // Hash the password 
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "User is now registered."
                });
            });
        });
    });
});

/**
 * @route POST api/users/login
 * @desc User sign-in
 * @access Public
 */

 router.post('/login', (req, res) => {
     User.findOne({ 
        email: req.body.email
     }).then(user => {
        if(!user){
            return res.status(404).json({
                msg: "Email not registered.",
                success: false
            });
        }
        // If email is registered, comparing password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if(isMatch){
                // Password is correct --> Send the JSON Token for user
                const payload = {
                    _id: user.id,
                    email: user.email
                }
                jwt.sign(payload, key, { 
                    expiresIn: 604800
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        user: user,
                        msg: "You are now logged in."
                    });
                })
            } else {
                return res.status(404).json({
                    msg: "Incorrect password.",
                    success: false
                });
            }
        });    
     });
 });

/**
 * @route POST api/users/home
 * @desc Return user data
 * @access Private
 */

router.get('/profile', passport.authenticate('jwt', { 
    session: false 
}), (req, res) => {
    return res.json({
        user: req.user
    });
});


module.exports = router;