const express = require('express');
const router = express.Router();
const api = require('../api')

const User = require('../entities/users');

router.post('/signup',api.signup);




module.exports = router;