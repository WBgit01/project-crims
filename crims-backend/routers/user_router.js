const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, registerUser, loginUser, updateUser, patchUser, deleteUser } = require('../controllers/user_controller.js');

router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:userId', updateUser);
router.patch('/:userId', patchUser);
router.delete('/:userId', deleteUser);

module.exports = router;
