const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');
const auth = require('../middlewares/auth');

router.post('/', auth, postController.createPost);

router.put('/:id', auth, postController.updatePost);

router.delete('/:id', auth, postController.deletePost);

router.get('/:id', auth, postController.getOnePost);

router.get('/', auth, postController.getAllPost);


module.exports = router;