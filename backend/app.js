/*Import du package express */
const express = require('express');
/* Création de l'app express*/
const app = express();
/* Import de body-parser permettant d'analyser les requêtes*/
const bodyParser = require('body-parser');
/*Import de cookie-parser */
const cookieParser = require('cookie-parser');
/*Package de sécurité helmet*/
const helmet = require('helmet'); 
/*Import de xss clean*/
const xssClean = require('xss-clean');

/* Routes*/
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments');
const likeRoutes = require('./routes/likes');

/* dotenv*/
require('dotenv').config();


/* Middleware général, appliqué à toutes les routes vers le serveur. */
app.use((req, res, next) => {
    /*On autorise l'accès à l'API depuis n'importe quelle origine ('*').*/
    res.setHeader('Access-Control-Allow-Origin', '*');
    /*On autorise l'utilisation de certains headers sur l'objet requête*/
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    /* On autorise différentes méthodes de requêtes (GET, POST, PUT, etc)*/
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
/*Appel du package de sécurité helmet*/
app.use(helmet());

/*XSS assainit les corps des requêtes POST, GET et des paramètres URL*/
app.use(xssClean());

/*Appel de bodyParser*/
app.use(bodyParser.json());

/*Appel de cookie Parser*/
app.use(cookieParser());

app.use('/api/post', postRoutes, commentRoutes, likeRoutes);
app.use('/api/user', userRoutes);


module.exports = app;
