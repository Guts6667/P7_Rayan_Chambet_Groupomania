/* Import d'express*/
const express = require('express');
/* Import de la class express.Router*/
const router = express.Router();
/* Import du controller posts */
const postController = require('../controllers/posts');
/* Import du middleware d'authentification*/
const auth = require('../middlewares/auth');

/*Route post permettant de créer un post */
router.post('/', auth, postController.createPost);

/* Route put permettant de modifier un post (Version ultérieur)*/
router.put('/:id', auth, postController.updatePost);

/* Route delete permettant de supprimer un post*/
router.delete('/:id', auth, postController.deletePost);

/* Route get permettant de récupérer un post*/
router.get('/:id', auth, postController.getOnePost);

/* Route get permeettant de récupérer touts les posts*/
router.get('/', auth, postController.getAllPost);


module.exports = router;