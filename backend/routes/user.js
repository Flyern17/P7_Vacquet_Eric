const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth-middleware");
const userCtrl = require('../controllers/user-controllers');

// On appelle le middleware de vérification du mot de passe
const passwordValidator = require('../middleware/strongPassword');

// Route de l'inscription d'un utilisateur
router.post('/signup', passwordValidator, userCtrl.signup);

// Route de la connexion d'un utilisateur
router.post('/login', userCtrl.login);

// Route de la suppression d'un utilisateur
router.delete('/delete/:id', auth, userCtrl.deleteUser);

// Route de la mise à jour d'un utilisateur
router.put('/update/:id', auth, userCtrl.updateUser);

// Route de l'affichage d'un utilisateur
router.get('/profile/:id', userCtrl.getOneUser);

module.exports = router;