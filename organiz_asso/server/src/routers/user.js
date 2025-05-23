const express = require('express');
const router = express.Router();
const api = require('../api')

router.get('/getUser',api.isAuthentified,api.getUser);
router.get('/me',api.isAuthentified,api.getProfile);
router.put('/:user/setStatus', api.isAuthentified,api.isAdmin,api.setStatus);
router.post('/upload-avatar', api.isAuthentified,api.upload.single('avatar'),api.setAvatar)

module.exports = router;