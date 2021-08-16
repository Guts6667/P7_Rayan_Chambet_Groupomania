/* Import de connectionDB*/
const connectionDb = require('../services/connection-bdd');

/* Model de création de commentaire*/
exports.create = (userId, postId, comment) => {
  return new Promise((resolve, reject) => {
      /* Récupération de la connexion*/
    const db = connectionDb.getDbConnection();
    /* Requête SQL*/
    const sql = "INSERT INTO Comments (user_id, post_id, comment, created, updated) VALUES (?, ?, ?, NOW(), NOW())";
    db.query(sql, [userId, postId, comment], (err, rows, fields) => {
      if(err)
      reject(err);

      resolve('Commented successfully');
    })
  })
}

/* Modification du commentaire pour une version ultérieure*/
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

/* Récupétation du commentaire*/
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

/*Suppression du commentaire */
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

/* Récupération du commentaire lié au post*/
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
