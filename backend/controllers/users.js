/*Import du model user */
const userModel = require('../models/users');
/*Import du package bcrypt */
const bcrypt = require('bcrypt');
/* Import de jsonwebtoken*/
const jwt = require('jsonwebtoken');
/* Import du package jwt-decode*/
const jwt_decode = require('jwt-decode');
/* Import de la fonction isAdmin pour modérer l'application*/
const {isAdmin} = require('../services/isadmin');
/* Import du package validator pour valider et nettoyer les string*/
const validator = require('validator');

/* Fonction signUp*/
exports.signUp = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  if(validator.isEmail(email) === false) { /* Si l'email n'est pas valide*/
    return res.status(400).json({
      message: "Email non conforme",
    });
  }
  /* Si le mot de passe n'est pas confore*/
  if(validator.isStrongPassword(password,{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false,}) === false){
    return res.status(400).json({
      message: "Mot de passe non conforme",
    });
  }
  /* Création d'un nouvel utilisateur*/
  userModel.create(req.body)
  .then((rows) => {
    res.send(rows);
  })
  .catch((err) => {
    res.send(err);
  })
}

/*Fonction login */
exports.login = (req, res, next) => {
  const { email, password } = req.body;

  /*Si l'email ou le mot de passe sont incorrects */
  if (!email || !password) {
    return res.status(400).json({
      message: "Identifiant ou mot de passe incorrect",
    });
  }
  /* Si l'email ou le mot de passe ne correspondent pas*/
  userModel.findOneByEmail(email)
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              message: "Identifiant ou mot de passe incorrect",
            });
          }
          /* Connexion */
          res.status(200).json({
            token: jwt.sign(
              {
                userId: user.id,
                account: user.account,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: process.env.JWT_EXPIRES,
              }
            ),
          });
        }).catch((err) => {
          return res.status(401).json({
            message: err,
          });
        });
    })
    .catch((err) => {
      res.status(401).json({
        message: err,
      });
    });
}

/* Fonction deleteAccount*/
exports.deleteAccount = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt_decode(token);
  const userId = decoded.userId;
/* Suppression du compte*/
  userModel.deleteOne(userId)
  .then((rows) => {
    res.send(rows);
  })
  .catch((err) => {
    return res.status(400).send("Vous n'êtes pas autorisé à supprimer cet utilisateur");
  })
}

/*Fonction deleteAccountAdmin pour version ultérieur permettant à un administrateur de supprimer un compte directement depuis une Vue de l'application */
exports.deleteAccountAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt_decode(token);
  const userId = decoded.userId;

  isAdmin(userId)
  .then((isUserAdmin) => {
    if(isUserAdmin === 0) {
      return res.status(400).send("Vous n'êtes pas autorisé à supprimer cet utilisateur");
    }
    userModel.deleteOne(req.params.id)
    .then((rows) => {
      return res.send(rows);
    })
    .catch(() => {
      return res.status(400).send("Vous n'êtes pas autorisé");
    })
  })
  .catch(() => {
    return res.status(400).send("L'utilisateur n'existe pas");
  })
}

/* Fonction getOneUser*/
exports.getOneUser = (req, res, next) => {
  userModel.getOne(req.params.userId)
    .then((rows) => {
        res.send(rows);
    })
    .catch((err) => {
        console.log(err);
    })
}
/* Fonction getAllUsers*/
exports.getAllUsers = (req, res, next) => {
  userModel.getAll()
  .then((rows) => {
    res.send(rows);
  })
  .catch((err) => {
    console.log(err);
  })
}
