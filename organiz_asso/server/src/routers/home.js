const express = require('express');
const router = express.Router();
const api = require('../api')

router.get('/',api.isAuthentified,api.default);

module.exports = router;