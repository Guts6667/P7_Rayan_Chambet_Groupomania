/* Import de connectionDb*/
const connectionDb = require('../services/connection-bdd');

/* Fonction de création de like pour une version ultérieure*/
exports.createLike = (userId, postId) => {
  return new Promise((resolve, reject) => {

    const db = connectionDb.getDbConnection();
    const sql = "INSERT INTO Likes (user_id, post_id, created, updated) VALUES (?, ?, NOW(), NOW())";
    db.query(sql, [userId, postId], (err, rows, fields) => {
      if(err)
      reject(err);

      resolve('Liked successfully');
    });
  });
};

/* Fonction de suppression de like pour versino ultérieure*/
exports.deleteLike = (post_id, user_id) => {
  return new Promise((resolve, reject) => {

    const db = connectionDb.getDbConnection();
    db.query('DELETE FROM Likes WHERE post_id = ? AND user_id = ?', [post_id, user_id] , (err, rows, fields) => {
      if(err)
        reject(err);

      resolve('Unliked Successfully');
    });
  });
};
