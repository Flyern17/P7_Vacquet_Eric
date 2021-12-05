const jwt = require('jsonwebtoken');
require('dotenv').config();

// On décode le token reçu 
module.exports = (req, res, next) => {
    try {
        // On récupère le token du header
        const token = req.headers.authorization.split(' ')[1];

        // On décode le token grâce au token présent dans le .env
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        
        // On défini userId comme étant le userid présent dans le token
        const userId = decodedToken.userid;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
}