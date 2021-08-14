const connectionDb = require('../services/connection-bdd');

exports.create = (userId, postId, comment) => {
  return new Promise((resolve, reject) => {

    const db = connectionDb.getDbConnection();
    const sql = "INSERT INTO Comments (user_id, post_id, comment, created, updated) VALUES (?, ?, ?, NOW(), NOW())";
    db.query(sql, [userId, postId, comment], (err, rows, fields) => {
      if(err)
      reject(err);

      resolve('Commented successfully');
    })
  })
}

exports.modify = (comment, id) => {
  return new Promise((resolve, reject) => {

    const db = connectionDb.getDbConnection();
    const sql = "UPDATE Comments SET comment = ?, updated = NOW() WHERE id = ?";
    db.query(sql, [comment, id], (err, rows, fields) => {
      if(err)
      reject(err);

      resolve('Comment updated successfully');
    });
  });
};

exports.getOne = (id) => {
  return new Promise((resolve, reject) => {

    const db = connectionDb.getDbConnection();
    db.query('SELECT * FROM Comments WHERE id = ?', [id] , (err, rows, fields) => {
      if(err || rows.length === 0)
        reject(err);

      resolve(rows[0]);
    });
  });
};

exports.deleteOne = (id, userId) => {
  return new Promise((resolve, reject) => {

    const db = connectionDb.getDbConnection();
    db.query(`DELETE
    FROM Comments AS C
    WHERE C.id = ?
    AND (
    C.user_id = ?
    OR ( SELECT U.id FROM Users as U WHERE U.id = ? AND U.user_admin = 1 ) IS NOT NULL
    )`, [id, userId, userId] , (err, rows, fields) => {
      if(err)
        reject(err);

      resolve('Deleted Successfully');
    });
  });
};

exports.getCommentsByPost = (post_id) => {
  return new Promise((resolve, reject) => {
    const db = connectionDb.getDbConnection();

    db.query(`SELECT C.*, CONCAT(U.firstname, ' ', U.lastname) AS username
    FROM Comments AS C
    LEFT JOIN Users AS U ON C.user_id = U.id
    WHERE C.post_id = ?
    ORDER BY C.created DESC`, [post_id], (err, rows, fields) => {
      if(err)
        reject(err);

      resolve(rows);
    });
  });
};
