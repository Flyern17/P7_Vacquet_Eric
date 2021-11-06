const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth-middleware");
const userCtrl = require('../controllers/user-controllers');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete/:id', userCtrl.deleteUser)
router.put('/update/:id', userCtrl.updateUser)

module.exports = router;