/* Import d'express*/
const express = require('express');
/* Import de la class express.Router*/
const router = express.Router();
/* Import du controller likes pour une version ultérieure */
const likesController = require('../controllers/likes');
/* Import du middleware d'authentification*/
const auth = require('../middlewares/auth');

/*Route post permettant de créer un like */
router.post('/:postId/likes', auth, likesController.postLike);

/* Route delete permettant de supprimer un like*/
router.delete('/:postId/likes', auth, likesController.deleteLike);

module.exports = router;
