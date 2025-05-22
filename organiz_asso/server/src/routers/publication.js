const express = require('express');
const router = express.Router();
const api = require('../api')

router.post('/createPost',api.isAuthentified,api.createPost);
router.get('/getPost',api.isAuthentified,api.getPostID);
router.get('/search',api.isAuthentified,api.search);
router.get('/getUserPost/:user',api.isAuthentified,api.getPostUser);
router.get('/getAll/:forum',api.isAuthentified,api.getPostAll);
router.delete('/deletePost/:id', api.isAuthentified, api.deletePost);

module.exports = router;