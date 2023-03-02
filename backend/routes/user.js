const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const authMiddleware = require('../middleware/auth');



// router.post('/signup',authMiddleware.checkAuth, userController.signUp);

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

module.exports = router;