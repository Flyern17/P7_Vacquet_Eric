const db = require('./db');

const User = function(user) {
    this.username = user.username,
    this.password = user.password,
    this.email = user.email,
    this.grade = user.grade,
    this.firstname = user.firstname,
    this.lastname = user.lastname,
    this.job = user.job,
    this.birthdate = user.birthdate
    this.isActive = !!user.isActive
}

// Création d'un user
User.create = (newUser, result) => {
    db.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        } else {
            console.log("User crée: ", {id: res.id, ...newUser});
            result(null, {id: res.id, ...newUser})
        }
    })
};

// Inspection du user

User.findOneByEmail = (email, result) => {
    db.query("SELECT * FROM Users WHERE email = ? AND isActive=true", email, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        } else {
            console.log("Utilisateur avec l'email: ", res[0]) 
            result(null, res[0])
        }
    })
};

// Trouver un user via son id 

User.findOneById = (id, result) => {
    db.query(`SELECT * FROM Users WHERE id = ? AND isActive=true`, id, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        } else {
            console.log("Utilisateur avec l'id: ", res) 
            result(null, res)
        }
    })
}

// Suppression d'un user 

User.delete = (id, result) => {;
    db.query(`UPDATE users SET isActive=false WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        } else {
            console.log("user supprimé id:", id);
            result(null, res);
        }
    })
}

// Modification d'un user

User.update = (id, user, result) => {
    db.query("UPDATE users SET firstname = ?, lastname = ?, job = ?, birthdate = ? WHERE id = ? AND isActive=true", [user.firstname, user.lastname, user.job, user.birthdate, id], (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        } 
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Utilisateur mis à jour: ", {id: id, ...user});
        result(null, {id: id, ...user});
        
    })
}

module.exports = User;