/* Import du model Post*/
const postModel = require('../models/posts');
/* Import de jwt_decode*/
const jwt_decode = require('jwt-decode');
/* Import du fichier utils permttant de prévenir contre les injections  en remplaçant les symboles*/
const utils = require('../services/utils');
/* Import de la fonction isLenght du package validator*/
const isLength = require('validator/lib/isLength');

/* Fonction createPost*/
exports.createPost = (req, res, next) => {
    /* Utilisation d'utils pour nettoyer les posts*/
    const post_content = utils.strip_tags(req.body.post_content).trim();
    if ( !isLength(post_content, { min: 2, max: 255 }) ) {
        return res.status(400).send("La longueur du commentaire n'est pas acceptée");
    }
    /* Vérification*/
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt_decode(token);
    const userId = decoded.userId;
    /* Création du post*/
    postModel.create(post_content, userId)
    .then((rows) => {
      res.send(rows);
    })
    .catch(() => {
        res.status(500).send();
    })
};


/* Fonction getOnePost*/
exports.getOnePost = (req, res, next) => {

    postModel.getOne(req.params.id)
    .then((rows) => {
        res.send(rows);
    })
    .catch(() => {
        res.status(500).send();
    })
};

/* Fonction getAllPost*/
exports.getAllPost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt_decode(token);
    const userId = decoded.userId;

    postModel.getAll(userId)
    .then((rows) => {
        res.send(rows);
    })
    .catch((error) => {
        res.status(500).send(error);
        console.log(error)
    })
};

/* Fonction deletePost*/
exports.deletePost = (req, res, next) => {

    /* Vérification*/
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt_decode(token);
    const userId = decoded.userId;
    
    /* Suppression du post*/
    postModel.deleteOne(req.params.id, userId, userId)
    .then(() => {
        res.send("Post supprimé");
    })
    .catch((err) => {
        res.status(500).send(err);
    })

};

    /* Fonction updatePost pour une version ultérieure permettant de mettre à jour un post*/
exports.updatePost = (req, res, next) => {

    /* Récupération du post*/
    postModel.getOne(req.params.id)
    .then((rows) => {
        const user_id = rows.user_id;
    /* Vérification*/
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt_decode(token);
        const userId = decoded.userId;

        if( userId !== user_id ) {
            return res.status(400).send("Vous n'êtes pas autorisé à modifier ce post");
        }
        const post_content = utils.strip_tags(req.body.post_content).trim();
        if ( !isLength(post_content, { min: 2, max: 255 }) ) {
            return res.status(400).send("La longueur du commentaire n'est pas acceptée");
        }
        /* Mise à jour du post*/
        postModel.updateOne(post_content, req.params.id )
        .then((rows) => {
            res.send(rows);
        })
        .catch(() => {
            res.status(500).send();
        })
    })
    .catch(() => {
        res.status(500).send();
    })
};
