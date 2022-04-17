const authController = require("../controllers/auth.controller.js");
const router = require('express').Router()

// Register
router.post('/register', authController.register)

// Log in
router.post('/login', authController.login)

// User info
router.get('/user', authController.user)

// Log out
router.post('/logout', authController.logout)

module.exports = router;
