const Post = require('../models/post');
const postModel = require('../models/post');
const fs = require('fs');

// Création d'un post

exports.createPost = (req, res, next) => {
    // Validation de la requête
    console.log(req.body)
    if (!req.body) {
        res.status(400).send({ message: "Cette requête ne peut être vide!" });
    }

    let d = new Date();
    let date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

    const post = new postModel({
        userid: req.body.userid,
        body: req.body.body,
        image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
        date_post: date,
    });

    postModel.create(post, (err, data) => {
        if(err) {
            res.status(500).send({ message: err.message || "Une erreur a été detectée lors de la création du post" });
        } else res.status(201).send(data);
    })
};

// Trouver tout les posts existants

exports.findAllPost = (req, res, next) => {
    postModel.findAll((err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Une erreur a été détectée lors de la recherche des posts."});
        } else {
            res.status(200).send(data);
        }
    });
};

// Trouver un seul post

exports.findOnePost = (req, res, next) => {
    postModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Post non trouvé avec l'id: ${req.params.id}.` });
            } else {
                res.status(500).send({ message: "Une erreur est survenue lors de la recherche du post avec l'id: " + req.params.id });
            }
        } else {
            res.status(200).send(data);
        }
    });
};

// Supprimer un post

exports.deletePost = (req, res, next) => {
    postModel.findById(req.params.id, (err, data) => {
        console.log(data)
        if(data.image) {
            const filename = data.image.split('/images/')[1]
            console.log(filename)
            fs.unlink(`images/${filename}`, (err) => {
                if(err) {
                    res.status(500).send({ message : "Une erreur est arrivée lors de la suppression de l'image!" })
                }
            })
        }
        postModel.delete(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({ message: `Aucun post trouvé avec l'id ${req.params.id}` });
                } else {
                    res.status(500).send({ message: "Suppression non autorisée de l'id " + req.params.id });
                }
            } else {
                res.status(200).send({ message: "Le post a bien été supprimé." });
            }
        });
    })
};

// Trouver toutes les reactions

exports.findAllReaction = (req, res) => {
    postModel.findAllReactions(req.params.id, (err, result) => {
        if (err) {
            res.status(400).send({ message: "Aucune réaction n'a été trouvée!" });
        } else {
            res.status(200).send(result)
        }
    })
};

// Ajouter une reaction

exports.createReaction = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Cette requête ne peut être vide!" });
    }
    const newReaction = {
        userid: req.body.userid,
        postid: req.body.postid,
        type: req.body.type
    };
    console.log(newReaction)

    Post.findReaction(newReaction, (err, data) => {
        if (data.length == 0) {
            Post.addReaction(newReaction, (err, data) => {
                if(err) {
                    return res.status(400).send({ message: "Impossible de créer cette réaction!" });
                }
                res.status(201).send(data);
            });
        } else {
            Post.updateReaction(newReaction, (err, data) => {
                if (err) {
                    return res.status(400).send({ message: "Impossible de mettre à jour cette réaction!" });
                }
                res.status(201).send(data)
            })
        }
    })
}


