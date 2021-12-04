const db = require('./db');

const Post = function(message) {
    this.userid = message.userid,
    this.body = message.body,
    this.image = message.image,
    this.date_post = message.date_post
} 

// Creer un post

Post.create = (newPost, result) => {
    db.query("INSERT INTO posts SET ?", newPost, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        }

        result(null, {id: res.id, ...newPost});
    });
};

// Trouver un post grâce à son ID 

Post.findById = (id, result) => {
    db.query(`SELECT * FROM posts WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        }

        result(null, res[0]);
    });
};

// Trouver tous les posts

Post.findAll = result => {

    //"SELECT * FROM posts ORDER BY id DESC"
    let request = "SELECT Posts.body, Posts.image, Posts.date_post, Posts.userid, Posts.id, Users.username FROM Posts JOIN Users ON Users.id = Posts.userid ORDER BY Posts.id DESC"
    db.query(request, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

// Supprimer un post grâce à son ID 

Post.delete = (id, result) => {
    db.query(`DELETE FROM posts WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
    });
};

// Trouver toutes les réactions

Post.findAllReactions =  (postid, result) => {
    let test1 = "SELECT Reaction.postid, Reaction.id, Reaction.type, COUNT(*) AS sumReaction FROM Reaction GROUP BY Reaction.postid, Reaction.id ORDER BY Reaction.postid DESC"
    db.query(test1, postid, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            console.log("Reactions trouvées:", res);
            result(null, res);
        }
    })
};

// Ajouter une réaction

Post.addReaction = (newReaction, result) => {
    db.query('INSERT INTO reaction SET ?', newReaction, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            // return;
        } 

        console.log("Reaction ajoutée:", {id: res.insertId, ...newReaction});
        result(null, {id: res.insertId, ...newReaction});
    });
};

// Trouver un type de réaction 

Post.findReactionType = (id, result) => {
    db.query("SELECT Reaction.type, Reaction.id FROM Reaction WHERE id = ?", id, (err, res) => {
        if (err) {
            result(err, null);
        }
        result(null, res);
    })
};

// Trouver une réaction précise

Post.findReaction = (reaction, result) => {
    db.query(`SELECT * FROM Reaction WHERE postid = ? AND userid = ?`, [reaction.postid, reaction.userid], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

// Modifier une réaction 

Post.updateReaction = (newReaction, result) => {
    db.query('UPDATE reaction SET type= ? WHERE postid = ? AND userid = ?', [newReaction.type, newReaction.postid, newReaction.userid], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            console.log("Reaction modifiée :", res);
            result(null, res);
        }
    });
}

module.exports = Post;