/* Import d'express*/
const express = require('express');
/* Import de Router express*/
const router = express.Router();
/* Import du controller Users*/
const userController = require('../controllers/users');
/* Import du middleware d'authentification*/
const auth = require('../middlewares/auth');

/* Route post permettant de s'inscrire*/
router.post('/signup', userController.signUp);

/* Route post permettant de se connecter*/
router.post('/login', userController.login);

/* Route permettant de supprimer son compte*/
router.delete('/delete', auth, userController.deleteAccount);

/* Route permettant à l'administrateur de supprimer un compte (Version ultérieure)*/
router.delete('/delete/:id', auth, userController.deleteAccountAdmin);

/* Route permettant de récupérer un utilisateur*/
router.get('/:userId', auth, userController.getOneUser)

/* Route permettant de récupérer tous les utilisateurs*/
router.get('/admin/users', auth, userController.getAllUsers)

module.exports = router;
