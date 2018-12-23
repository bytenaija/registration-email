const express = require('express');
const router = express.Router();
let {verifyToken} = require('../config/jwt')

const UserController = require('../controllers/user')

router.post('/login', UserController.login)

router.post('/register', UserController.register)

router.get('/verification/:code', UserController.emailVerification)

router.get('/users', verifyToken, UserController.getUsers)

module.exports = router;