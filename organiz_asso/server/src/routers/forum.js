const express = require('express');
const router = express.Router();
const api = require('../api')

router.get('/:type',api.isAuthentified,api.getForum);
module.exports = router;