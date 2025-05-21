const express = require('express');
const router = express.Router();
const api = require('../api')

router.post('/createPost',api.isAuthentified,api.createPost);
router.get('/getPost',api.isAuthentified,api.getPost);
router.get('/search',api.isAuthentified,api.search);
router.delete('/deletePost/:id', api.isAuthentified, api.deletePost);

module.exports = router;