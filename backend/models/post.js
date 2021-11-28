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

        result(null, res);
    });
};

Post.findAllReactions =  (postid, result) => {
    let jifej = 'SELECT * FROM reaction WHERE postid = ?';
    let test1 = "SELECT Reaction.postid, Reaction.id, COUNT(*) AS sumReaction FROM Reaction GROUP BY Reaction.postid, Reaction.id ORDER BY Reaction.postid DESC"
    let reactionQuery = "SELECT Reaction.postid, Reaction.type, Reaction.userid, Reaction.id FROM Reaction JOIN Posts ON Reaction.postid = Posts.id ORDER BY Reaction.id DESC"
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

        console.log("Reaction supprimé id:", id);
        result(null, res);
    });
};

module.exports = Post;