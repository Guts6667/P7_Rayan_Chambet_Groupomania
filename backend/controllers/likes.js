const likesModel = require('../models/likes');
const jwt_decode = require('jwt-decode');

exports.postLike = (req, res, next) => {
  const likeId = req.params.likeId;
  if(likeId === undefined) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt_decode(token);
    const userId = decoded.userId;
    const postId = req.params.postId;

    likesModel.createLike(userId, postId)
    .then((rows) => {
      res.send("Post liked successfully !");
    })
    .catch((err) => {
      res.status(400).send("Impossible de liker");
    })
  }
};

exports.deleteLike = (req, res, next) => {

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt_decode(token);
  const userId = decoded.userId;
  const postId = req.params.postId;

  likesModel.deleteLike(postId, userId)
  .then((rows) => {
    res.send(rows);
  })
  .catch(() => {
    res.status(500).send();
  })
}
