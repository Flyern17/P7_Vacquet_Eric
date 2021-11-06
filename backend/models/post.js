const db = require('./db');

const Post = function(message) {
    this.userid = message.userid,
    this.body = message.body,
    this.image = message.image,
    this.date_post = message.date_post
} 

Post.create = (newPost, result) => {
    db.query("INSERT INTO posts SET ?", newPost, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        }

        console.log("Post crée: ", {id: res.id, ...newPost});
        result(null, {id: res.id, ...newPost});
    });
};

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

Post.findAll = result => {
    db.query("SELECT * FROM posts", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Posts: ", res);
        result(null, res);
    });
};

Post.updateById = (id, post, result) => {
    db.query("UPDATE posts SET body = ?, image = ? WHERE id = ?", [post.body, post.image, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Post mis à jour: ", {id: id, ...post});
        result(null, {id: id, ...post});
    });
};

Post.delete = (id, result) => {
    db.query(`DELETE FROM posts WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("post supprimé id:", id);
        result(null, res);
    });
};

Post.findAllReactions =  (postid, result) => {
    db.query('SELECT * FROM reaction WHERE postid = ?', postid, (err, res) => {
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

Post.addReaction = (newReaction, result) => {
    db.query('INSERT INTO reaction SET ?', newReaction, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            // return;
        } 
        console.log(res)
        console.log("Reaction ajoutée:", {id: res.insertId, ...newReaction});
        result(null, {id: res.insertId, ...newReaction});
    });
};

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

Post.deleteReaction = (id, result) => {
    db.query(`DELETE FROM posts WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("post supprimé id:", id);
        result(null, res);
    });
};

module.exports = Post;