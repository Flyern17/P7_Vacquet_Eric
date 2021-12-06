const express = require('express');
const helmet = require('helmet');
const mysql = require('mysql2');
const db = require('./models/db');
const rateLimit = require('express-rate-limit');
const path = require('path');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');


// Limitation du nombre de connexion d'un utilisateur suivant une route
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // Nombre de requetes possibles pour chaque adresse IP
    message: "Nombre de requêtes dépassés, re-tentez dans 15m"
});

// Renvoie un id lors de la connexion à la bdd
db.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + db.threadId);
});


const app = express();

app.use(helmet());

// Headers 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use(express.json());

// Définition du chemin des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes

app.use('/api/user', limiter, userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;