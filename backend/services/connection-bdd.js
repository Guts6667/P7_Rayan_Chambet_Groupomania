/* Import de mysql*/
const mysql = require('mysql');

/* Middleware de connection à la base de données*/
exports.getDbConnection = () => {

    const db = mysql.createConnection({

        database: 'DB_Groupomania',

        host: "localhost",

        user: "root",

        password: "password",

        multipleStatements : true

    });

    db.connect((err) => {
      if (err) throw err;
      console.log("Connected to database");
    });

    return db;
}
