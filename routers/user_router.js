const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser } = require('../controllers/user_controller.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:userId', updateUser);

module.exports = router;
