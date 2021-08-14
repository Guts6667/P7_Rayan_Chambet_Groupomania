const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes');
const auth = require('../middlewares/auth');

router.post('/:postId/likes', auth, likesController.postLike);

router.delete('/:postId/likes', auth, likesController.deleteLike);

module.exports = router;
