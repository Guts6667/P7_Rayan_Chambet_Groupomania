/* Import d'express*/
const express = require('express');
/* Import de la class express.Router*/
const router = express.Router();
/* Import du controller comments*/
const commentsController = require('../controllers/comments');
/* Import du middleware d'authentification*/
const auth = require('../middlewares/auth');

/*Route post permettant de créer un commentaire */
router.post('/:postId/comment', auth, commentsController.createComment);

/*Route post permettant de modifier un commentaire pour une version ultérieur */
router.put('/:postId/comment/:commentId', auth, commentsController.modifyComment);

/*Route post permettant de supprimer un commentaire */
router.delete('/:postId/comment/:commentId', auth, commentsController.deleteComment);

/*Route post permettant de récupérer un commentaire */
router.get('/:postId/comment/:commentId', auth, commentsController.getOneComment);

/*Route post permettant de récupérer un commentaire lié à un post */
router.get('/:postId/comment', auth, commentsController.getCommentsPost);

module.exports = router;
