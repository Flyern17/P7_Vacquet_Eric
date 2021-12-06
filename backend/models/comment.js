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
            result(err, null);
            return;
        }
        result(null, {id: res.id, ...newComment});
    })
};

// Récupérer le dernier commentaire 

Comment.latest = (result) => {
    let request = "SELECT Coms.*, Users.username AS username FROM Coms JOIN Users ON Users.id=Coms.userid ORDER BY id DESC LIMIT 0,1";
    db.query(request, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, res[0]);
    })
}

// Trouver les différents commentaire d'un même post
Comment.findAll = (id, result) => {
    let request = "SELECT Coms.body, Coms.date_coms, Coms.userid, Coms.id, Coms.postid, Users.username FROM Coms JOIN Users ON Users.id = Coms.userid WHERE postid = ? ORDER BY Coms.id DESC";
    db.query(request, id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    }) 
};

// Supprimer un commentaire
Comment.delete = (id, result) => {
    db.query("DELETE FROM coms WHERE id=?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    })
}

module.exports = Comment;