/* Import de connectionDb*/
const connectionDb = require('../services/connection-bdd');

/* Création de post*/
exports.create = (post_content, userId) => {
  return new Promise((resolve, reject) => {

    const db = connectionDb.getDbConnection();
    /* Requête SQL permettant de créer un post*/
    const sql = "INSERT INTO Posts (post_content, user_id, created, updated) VALUES (?, ?, NOW(), NOW())";
    db.query(sql, [post_content, userId], (err, rows, fields) => {
      if(err)
        reject(err);

      resolve('Added successfully');
    });
  });
};

/* Récupération d'un post spécifique*/
exports.getOne = (id) => {
  return new Promise((resolve, reject) => {

    const db = connectionDb.getDbConnection();
    /*Requête SQL */
    db.query(`SELECT P.*, CONCAT(U.firstname, ' ',  U.lastname) AS username
    FROM Posts AS P
    LEFT JOIN Users AS U ON P.user_id = U.id
    WHERE P.id = ?`, [id] , (err, rows, fields) => {
      if(err || rows.length === 0)
        reject(err);

      resolve(rows[0]);
    });
  });
};

/* Récupération de tous les posts*/
exports.getAll = (user_id) => {
  return new Promise((resolve, reject) => {
    const db = connectionDb.getDbConnection();
    /* Requête SQL*/
    db.query(`SELECT P.*, CONCAT(U.firstname, ' ',  U.lastname) AS username, COUNT(DISTINCT L.id) AS nblikes, COUNT(DISTINCT C.id) AS nbcomments, IF(L2.id, TRUE, FALSE) AS userliked
    FROM Posts AS P
    LEFT JOIN Users AS U ON P.user_id = U.id
    LEFT JOIN Likes AS L ON P.id = L.post_id
    LEFT JOIN Comments AS C ON P.id = C.post_id
    LEFT JOIN Likes AS L2 ON L2.post_id = P.id AND L2.user_id = ?
    GROUP BY P.id
    ORDER BY P.created DESC`, [user_id],
    (err, rows, fields) => {
      if(err)
        reject(err);

      resolve(rows);
    });
  });
};

/* Suppression de post*/
exports.deleteOne = (id, userId) => {
  return new Promise((resolve, reject) => {

    const db = connectionDb.getDbConnection();
    /* Requête SQL*/
    db.query(`DELETE
    FROM Posts AS P
    WHERE P.id = ?
    AND (
    P.user_id = ?
    OR ( SELECT U.id FROM Users as U WHERE U.id = ? AND U.user_admin = 1 ) IS NOT NULL
    )`, [id, userId, userId] , (err, rows, fields) => {
      if(err)
        reject(err);

      resolve('Deleted Successfully');
    });
  });
};

/* Mise à jour du post pour version ultérieure*/
exports.updateOne = (post_content, id) => {
  return new Promise((resolve, reject) => {

    const db = connectionDb.getDbConnection();
    const sql = "UPDATE Posts SET post_content = ?, updated = NOW() WHERE id = ?";
    db.query(sql, [post_content, id], (err, rows, fields) => {
      if(err)
        reject(err);

      resolve('Modified Successfully');
    });
  });
};
