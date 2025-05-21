const express = require('express');
const router = express.Router();
const api = require('../api')

router.get('/',api.isAuthentified,api.getUser);
router.put('/:user/setStatus', api.isAuthentified,api.isAdmin,api.setStatus);

module.exports = router;