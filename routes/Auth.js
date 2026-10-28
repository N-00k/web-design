const express = require('express');
const { createauth, loginUser, checkAuth } = require('../controller/Auth');
const passport = require('passport');

const router = express.Router();
// / auth is already add in base path   
router.post('/signup', createauth);
router.post('/login', passport.authenticate('local'), loginUser);
router.get('/check', passport.authenticate('jwt'), checkAuth);

exports.router = router;    