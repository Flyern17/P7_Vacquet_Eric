const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth-middleware");
const userCtrl = require('../controllers/user-controllers');

const passwordValidator = require('../middleware/strongPassword');

router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete/:id', auth, userCtrl.deleteUser);
router.put('/update/:id', auth, userCtrl.updateUser);

router.get('/profile/:id', userCtrl.getOneUser);

module.exports = router;