/* Import de userModel*/
const userModel = require('../models/users');

/* Fontion isAdmin*/
exports.isAdmin = (user) => {
    return new Promise((resolve, reject) => {
        userModel.getOne(user)
        .then((rows) => {
            resolve(rows.user_admin)
        })
        .catch(() => {
            reject();
        })
    })
}
