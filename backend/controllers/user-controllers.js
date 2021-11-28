const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userModel = require('../models/user');
require('dotenv').config();

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new userModel({
                username: req.body.username,
                password: hash,
                email: req.body.email,
                grade: 1,
            });
            console.log(user);

            userModel.create(user, (err, data) => {
                if (err) {
                    return res.status(400).send({ message: "Username ou email déjà utilisée!" });
                } else {
                    res.status(201).send(data);
                }
            })
        })
        .catch(error => res.status(500).send({ message: "Un problème est survenue." }));
}

exports.login = (req, res, next) => {
    userModel.findOneByEmail(req.body.email, (err, result) => {
        if (!result) {
            return res.status(400).send({ message: "Utilisateur non trouvé!" });
        } else {
            bcrypt.compare(req.body.password, result.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).send({ message: 'Mot de passe incorrect !' });
                    } else {
                        let token = jwt.sign(
                            { userid: result.id }, 
                            process.env.TOKEN, 
                            { expiresIn: "24h" });
                            console.log(token)
                        res.status(200).json({
                            username: result.username,
                            userid: result.id,
                            token: token,
                            grade: result.grade
                        });
                    }                
                })
                .catch(error => res.status(500).json({ error: "Erreur serveur" }));
        }
    })
};

exports.getOneUser = (req, res, next) => {
    User.findOneById(req.params.id, (err, result) => {
        if (err) {
            return res.status(404).send({ message: "Utilisateur non trouvé" })
        } else {
            res.status(200).send(result)
        }
    })
}

exports.deleteUser = (req, res, next) => {
    userModel.delete(req.params.id, (err, result) => {
        if (err) {
            return res.status(400).send({ message: "Suppression de l'utilisateur non autorisée!" });
        } else {
            res.status(200).send({ message: "L'utilisateur a bien été supprimé!" });
        }
    })
};

exports.updateUser = (req, res, next) => {
    const newUser = new userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        job: req.body.job,
        birthdate: req.body.birthdate
    })

    userModel.update(req.params.id, newUser, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Aucun post trouvé avec l'id: ${req.params.id}.` });
            } else {
                res.status(500).send({ message: "Erreur lors de la mise à jour du post:" + req.params.id });
            }
        } else {
            res.status(200).send(data);
        }
    });
};