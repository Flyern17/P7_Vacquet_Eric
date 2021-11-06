const comsModel = require('../models/comment');

exports.createComment = (req, res, next) => {
    // Validation de la requête
    if (!req.body) {
        res.status(400).send({ message: "Cette requête ne peut être vide!" });
    }

    const comment = new comsModel({
        postid: req.body.postid,
        userid: req.body.userid,
        body: req.body.body,
        date_coms: req.body.date_coms
    });

    comsModel.create(comment, (err, data) => {
        if(err) {
            res.status(500).send({ message: err.message || "Une erreur a été detectée lors de la création du post" });
        } else res.status(201).send(data);
    })
};

exports.findAllComment = (req, res, next) => {
    comsModel.findAll(req.params.id, (err, data) => {
        if (err) {
            res.status(400).send({ message: err.message || "Une erreur a été détectée lors de la recherche des commentaires."});
        } else {
            res.status(200).send(data);
        }
    });
};

exports.deleteComment = (req, res, next) => {
    comsModel.delete(req.params.id, (err, data) => {
        if (err) {
            res.status(400).send({ message: err.message || "Le commentaire n'a pas été supprimé!" })
        } else {
            res.status(200).send({ message: "Le commentaire a bien été supprimé!" })
        }
    });
};

