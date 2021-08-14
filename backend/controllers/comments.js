const jwt_decode = require('jwt-decode');
const commentModel = require('../models/comments');
const postModel = require('../models/posts');
const userModel = require('../models/users');
const utils = require('../services/utils');
const isLength = require('validator/lib/isLength');
const isInt = require('validator/lib/isInt');

exports.createComment = (req, res, next) => {
  const postId = req.params.postId;
  if ( !isInt(postId) ) {
    return res.status(400).send("Le postId est incorrect.");
  }

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

exports.getOneComment = (req, res, next) => {
  commentModel.getOne(req.params.commentId)
  .then((rows) => {
    res.send(rows);
  })
  .catch((err) => {
    res.status(500).send("Vous n'avez pas la possibilité de faire cette action")
  })
};

exports.getCommentsPost = (req, res, next) => {
  commentModel.getCommentsByPost(req.params.postId)
  .then((rows) => {
    res.send(rows);
  })
  .catch(() => {
    res.status(500).send();
  })
}
