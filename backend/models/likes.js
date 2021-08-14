const connectionDb = require('../services/connection-bdd');

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
