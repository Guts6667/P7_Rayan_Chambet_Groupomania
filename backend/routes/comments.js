const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');
const auth = require('../middlewares/auth');

router.post('/:postId/comment', auth, commentsController.createComment);

router.put('/:postId/comment/:commentId', auth, commentsController.modifyComment);

router.delete('/:postId/comment/:commentId', auth, commentsController.deleteComment);

router.get('/:postId/comment/:commentId', auth, commentsController.getOneComment);

router.get('/:postId/comment', auth, commentsController.getCommentsPost);

module.exports = router;
