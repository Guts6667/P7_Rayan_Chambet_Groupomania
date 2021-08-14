const postModel = require('../models/posts');
const jwt_decode = require('jwt-decode');
const utils = require('../services/utils');
const isLength = require('validator/lib/isLength');

exports.createPost = (req, res, next) => {

    const post_content = utils.strip_tags(req.body.post_content).trim();
    if ( !isLength(post_content, { min: 2, max: 255 }) ) {
        return res.status(400).send("La longueur du commentaire n'est pas acceptée");
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt_decode(token);
    const userId = decoded.userId;

    postModel.create(post_content, userId)
    .then((rows) => {
      res.send(rows);
    })
    .catch(() => {
        res.status(500).send();
    })
};

exports.getOnePost = (req, res, next) => {

    postModel.getOne(req.params.id)
    .then((rows) => {
        res.send(rows);
    })
    .catch(() => {
        res.status(500).send();
    })
};

exports.getAllPost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt_decode(token);
    const userId = decoded.userId;

    postModel.getAll(userId)
    .then((rows) => {
        res.send(rows);
    })
    .catch((error) => {
        res.status(500).send(error);
        console.log(error)
    })
};

exports.deletePost = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt_decode(token);
    const userId = decoded.userId;

    postModel.deleteOne(req.params.id, userId, userId)
    .then(() => {
        res.send("Post supprimé");
    })
    .catch((err) => {
        res.status(500).send(err);
    })

};

exports.updatePost = (req, res, next) => {

    postModel.getOne(req.params.id)
    .then((rows) => {
        const user_id = rows.user_id;

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt_decode(token);
        const userId = decoded.userId;

        if( userId !== user_id ) {
            return res.status(400).send("Vous n'êtes pas autorisé à modifier ce post");
        }
        const post_content = utils.strip_tags(req.body.post_content).trim();
        if ( !isLength(post_content, { min: 2, max: 255 }) ) {
            return res.status(400).send("La longueur du commentaire n'est pas acceptée");
        }
        postModel.updateOne(post_content, req.params.id )
        .then((rows) => {
            res.send(rows);
        })
        .catch(() => {
            res.status(500).send();
        })
    })
    .catch(() => {
        res.status(500).send();
    })
};
