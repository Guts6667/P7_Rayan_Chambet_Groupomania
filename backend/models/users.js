/* Import de connectionDb*/
const connectionDb = require('../services/connection-bdd');
/* Import de bcrypt*/
const bcrypt = require('bcrypt');
/* Import de mysql*/
const mysql = require("mysql");

/* Création d'utilisateur*/
exports.create = (post) => {
  return new Promise((resolve, reject) => {
    const db = connectionDb.getDbConnection();
    const saltRounds = 10;
    /* Utilisation de la fonction hash de bcrypt*/
    bcrypt.hash(post.password, saltRounds, (err, hash) => {
      /* Requête SQL*/
      const sql = "INSERT INTO Users (firstname, lastname, email, password, user_admin, created, updated) VALUES (?, ?, ?, ?, 0, NOW(), NOW())";

      db.query(sql, [post.firstname, post.lastname, post.email, hash], (err, rows, fields) => {
        if(err)
          reject(err);

        resolve('User created successfully');
      });
    });
  });
};

/* Récupération d'un seul utilisateur*/
exports.findOneBy = (field, value) => {
  return new Promise((resolve, reject) => {
    const db = connectionDb.getDbConnection();
    const string = `SELECT * FROM Users WHERE ${field} = ?`;
    const inserts = [value];
    const sql = mysql.format(string, inserts);

    db.query(sql, (error, user) => {
      if (user.length === 0) {
        reject(new Error("Votre adresse mail est invalide"));
      }
      const selectedUser = user[0];
      resolve(selectedUser);
    });
  });
};

/* Récupération de l'email*/
exports.findOneByEmail = (email) => {
  return this.findOneBy('email', email);
};


/* Suppression de l'utilisateur*/
exports.deleteOne = (id) => {
  return new Promise((resolve, reject) => {

    const db = connectionDb.getDbConnection();
    db.query("DELETE FROM Users AS U WHERE U.id = ?", [id], (err, rows, fields) => {
    if(err)
      reject(err);

    resolve("Deleted successfully");
    });
  });
};

/* Récupération utilisateur*/
exports.getOne = (id) => {
  return new Promise((resolve, reject) => {

    const db = connectionDb.getDbConnection();
    db.query("SELECT * FROM Users WHERE id = ?", [id], (err, rows, fields) => {
    if(err)
      reject(err);

    resolve(rows);
    });
  });
};

/* Récupération de tous les utilisateurs*/
exports.getAll = () => {
  return new Promise((resolve, reject) => {
    const db = connectionDb.getDbConnection();
    db.query(`SELECT U.*, CONCAT(U.firstname, ' ',  U.lastname) AS username
    FROM Users AS U
    ORDER BY U.created DESC`, (err, rows, fields) => {
      if(err)
        reject(err);

      resolve(rows);
    });
  });
};