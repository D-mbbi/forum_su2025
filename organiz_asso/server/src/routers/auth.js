const express = require('express');
const router = express.Router();
const api = require('../api')

const User = require('../entities/users');

router.post('/signup',api.signup);
router.post('/login',api.login);
router.post('/logout',api.logout);


module.exports = router;