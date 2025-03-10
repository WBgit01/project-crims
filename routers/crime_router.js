const express = require('express');
const router = express.Router();
const {getCrimes, getCrime, reportCrime, updateCrime} = require('../controllers/crime_controller.js');

router.get('/crime', getCrimes);
router.get('/crime:id', getCrime);
router.post('/crime', reportCrime);
router.put('/crime:id', updateCrime);

module.exports = router;