const express = require('express');
const router = express.Router();
const {getCrimes, getCrime, reportCrime, updateCrime, patchCrime, deleteCrime} = require('../controllers/crime_controller.js');

router.get('/', getCrimes);
router.get('/:crime_id', getCrime);
router.post('/', reportCrime);
router.put('/:crime_id', updateCrime);
router.patch('/:crime_id', patchCrime);
router.delete('/:crime_id', deleteCrime);

module.exports = router;