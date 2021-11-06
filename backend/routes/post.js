const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth-middleware");
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post-controllers');
const comsCtrl = require('../controllers/comment-controllers');

// CRUD des fonctionnalités des posts
router.get('/', auth, postCtrl.findAllPost);
router.get('/:id', auth, postCtrl.findOnePost)
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id',auth, postCtrl.deletePost);

// Systeme de like / dislike 

router.get('/:id/reaction', auth, postCtrl.findAllReaction);
router.post('/:id/reaction', auth, postCtrl.createReaction);
router.put('/:id/reaction/:id',auth, postCtrl.updateReaction);

// CRUD des fonctionnalités des commentaires 
router.post('/:id/comment', auth, comsCtrl.createComment);
router.get('/:id/comment', auth, comsCtrl.findAllComment);
router.delete('/:id/comment/:id', auth,comsCtrl.deleteComment);


module.exports = router;