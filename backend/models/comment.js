const db = require('./db');

const Comment = function(message) {
    this.postid = message.postid,
    this.userid = message.userid,
    this.body = message.body,
    this.date_coms = message.date_coms
}

// Créer un commentaire

Comment.create = (newComment, result) => {
    db.query("INSERT INTO coms SET ?", newComment, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        }
        
        console.log("Commentaire crée: ", {id: res.id, ...newComment});
        result(null, {id: res.id, ...newComment});
    })
};


// Trouver les différents commentaire d'un même post
Comment.findAll = (id, result) => {
    db.query("SELECT * FROM coms WHERE postid = ?", id, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        } else {
            console.log("Comments: ", res);
            result(null, res);
        }
    }) 
};

// Supprimer un commentaire
Comment.delete = (id, result) => {
    db.query("DELETE FROM coms WHERE id=?", id, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        } else {
            console.log("Commentaire supprimé avec l'id: ", id);
            result(null, res);
        }
    })
}

module.exports = Comment;