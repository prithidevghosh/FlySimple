const express = require('express');
const ROUTER = express.Router();
const userController = require('../controller/user-controller')

ROUTER.post('/create', userController.CREATEUSER);
ROUTER.post('/create-session', userController.createSession);
ROUTER.post('/delete-session', userController.deleteSession)

module.exports = ROUTER;