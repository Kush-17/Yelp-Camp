const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.js');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
//const campground = require('../models/campground');

const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

// use the storeReturnTo middleware to save the returnTo value from session to res.locals
router.get('/logout', users.logout);


module.exports = router;

