const User = require('../models/user');
const bcrypt = require('bcrypt'); 
//npm i bcrypt is used to hash password before storing in database

//RENDER REGISTER PAGE
module.exports.renderRegister = (req, res, next) => {
    res.render('register');
}

//REGISTER USER
module.exports.registerUser=async (req, res, next) => {
    const { username, password, email } = req.body;
    const oldUser = await User.findOne({ username: username });

    //if username already in use
    if (oldUser) {
        req.flash('error', 'username you provided is already in use');
        return res.redirect('/register');
    }

    //hashing password and then storing in database
    const hash = await bcrypt.hash(password, 12);
    const newUser = new User({
        username: username,
        password: hash,
        email: email,
    });
    await newUser.save();

    //storing user._id in session for further use
    //mainly used for authorization etc.
    req.session.user_id = newUser._id;
    req.flash('success', `Registered Successfully ${newUser.username}`);
    res.redirect('/home');
}

//RENDER LOGIN PAGE
module.exports.renderLogin=(req, res, next) => {
    res.render('login');
}

//LOGIN A USER using credentials provided
module.exports.loginUser=async (req, res, next) => {
    const { username, password } = req.body;

    //User.findAndValidate is created inside the mongoose Schema file in models/user.js
    //it will check whether the username exists, if true then it verifies the password and returns the found user, otherwise returns false
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        req.flash('success', `Welcome ${foundUser.username}`);
        res.redirect('/home');
    }
    else {
        req.flash('error', 'Invalid Username or Password');
        return res.redirect('/login');
    }
}

//LOGOUT USER
module.exports.logoutUser=(req, res, next) => {
    //removed the user saved in session
    req.session.user_id = null;
    req.flash('success', 'Successfully Logged Out');
    res.redirect('/login');
}