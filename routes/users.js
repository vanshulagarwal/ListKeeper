const express = require('express');
const router = express.Router();
const { renderRegister, registerUser, renderLogin, loginUser, logoutUser } = require('../controllers/users');

//REGISTER USER routes
router.route('/register')
    // .get(renderRegister)
    .post(registerUser)

//LOGIN USER routes
router.route('/login')
    .get(renderLogin)
    .post(loginUser)

//LOGOUT USER routes
router.get('/logout', logoutUser)

module.exports = router;