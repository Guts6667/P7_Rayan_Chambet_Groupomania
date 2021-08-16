/* Import du package jwt_decode*/
const jwt_decode = require('jwt-decode');
/* Import du model Comments*/
const commentModel = require('../models/comments');
/* Import du model Post*/
const postModel = require('../models/posts');
/* Import du model User*/
const userModel = require('../models/users');
/* Import du fichier utils permettant de nettoyer les string en remplaçant les symboles*/
const utils = require('../services/utils');
/* Import de la fonction isLenght du package validator permettant de vérifier la taille d'une string*/
const isLength = require('validator/lib/isLength');
/* Import de la fonction isInt du package validator permettant de vérifier si le string est un integer*/
const isInt = require('validator/lib/isInt');


/* Fonction createComment*/
exports.createComment = (req, res, next) => {
  const postId = req.params.postId;
  if ( !isInt(postId) ) {
    return res.status(400).send("Le postId est incorrect.");
  }
console.log(req.body);
  postModel.getOne(postId)
    .then(() => {
      if (!req.body.comment) {
        return res.status(400).send("Il n'y a pas de commentaire.");
      }
      const comment = utils.strip_tags(req.body.comment).trim();
      if ( !isLength(comment, { min: 2, max: 255 }) ) {
        return res.status(400).send("La longueur du commentaire n'est pas acceptée");
      }
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt_decode(token);
      const userId = decoded.userId;

      commentModel.create(userId, postId, comment)
        .then((rows) => {
          res.send(rows);
        })
        .catch((err) => {
          res.status(500).send();
        });
    })
    .catch(() => {
      res.status(404).send("Le post n'existe pas");
    });
};

/* Function modifyComment*/
exports.modifyComment = (req, res, next) => {

  commentModel.getOne(req.params.commentId)
  .then((rows) => {
    const user_id = rows.user_id;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt_decode(token);
    const userId = decoded.userId;

    if( userId !== user_id ) {
      return res.status(400).send("Vous n'êtes pas autorisé à modifier ce post");
    }
    const commentId = req.params.commentId;
    const comment = utils.strip_tags(req.body.comment).trim();
    if ( !isLength(comment, { min: 2, max: 255 }) ) {
      return res.status(400).send("La longueur du commentaire n'est pas acceptée");
    }
    commentModel.modify(comment, commentId)
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      res.status(500).send();
    });
  })
  .catch((err) => {
    res.status(500).send("Vous n'avez pas la possibilité de faire cette action")
  })
}


/*Fonction deleteComment */
exports.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt_decode(token);
  const userId = decoded.userId;

  commentModel.deleteOne(req.params.commentId, userId, userId)
  .then(() => {
    res.send("Commentaire supprimé");
  })
  .catch(() => {
    res.status(500).send();
  })
}

/* Fonction getOneCOmment*/
exports.getOneComment = (req, res, next) => {
  commentModel.getOne(req.params.commentId)
  .then((rows) => {
    res.send(rows);
  })
  .catch((err) => {
    res.status(500).send("Vous n'avez pas la possibilité de faire cette action")
  })
};

/* Fonction getCommentsPost*/
exports.getCommentsPost = (req, res, next) => {
  commentModel.getCommentsByPost(req.params.postId)
  .then((rows) => {
    res.send(rows);
  })
  .catch(() => {
    res.status(500).send();
  })
}
