const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

router.get('/verify', authenticateToken, (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Token is valid',
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
