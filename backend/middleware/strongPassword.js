const passwordValidator = require("password-validator");
// Définition des conditions à respecter pour l'inscription du mot de passe.
let passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// On vérifie si le mot de passe est conforme ou non
module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, 'Le mot de passe doit contenir entre 8 et 100 caractères, avoir une majuscule et contenir au moins 2 chiffres!');
        res.end('Le format du mot de passe est incorrect !');
    } else {
        next();
    }
};