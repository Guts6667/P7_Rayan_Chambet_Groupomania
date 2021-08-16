/* Import du model likes pour une version ultérieur permettant de liker les posts*/
const likesModel = require('../models/likes');
/* Import du package jwt decode*/
const jwt_decode = require('jwt-decode');

/* Function postLike*/
exports.postLike = (req, res, next) => {
  const likeId = req.params.likeId;
  /* Vérification*/
  if(likeId === undefined) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt_decode(token);
    const userId = decoded.userId;
    const postId = req.params.postId;

    /* Ajout du like*/
    likesModel.createLike(userId, postId)
    .then((rows) => {
      res.send("Post liked successfully !");
    })
    .catch((err) => {
      res.status(400).send("Impossible de liker");
    })
  }
};

  /* Fonction deleteLike*/
exports.deleteLike = (req, res, next) => {
  /* Vérification*/
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt_decode(token);
  const userId = decoded.userId;
  const postId = req.params.postId;
  /* Suppression du like*/
  likesModel.deleteLike(postId, userId)
  .then((rows) => {
    res.send(rows);
  })
  .catch(() => {
    res.status(500).send();
  })
}
