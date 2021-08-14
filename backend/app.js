const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments');
const likeRoutes = require('./routes/likes');

require('dotenv').config();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/post', postRoutes, commentRoutes, likeRoutes);
app.use('/api/user', userRoutes);


module.exports = app;
