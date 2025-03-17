const express = require('express');
const router = express.Router();
const {getHumanResources, getHumanResource, createHumanResource, updateHumanResource, deleteHumanResource} = require('../controllers/human_resource_controller.js');

router.get('/', getHumanResources);
router.get('/:human_res_id', getHumanResource);
router.post('/', createHumanResource);
router.put('/:human_res_id', updateHumanResource);
router.delete('/:human_res_id', deleteHumanResource);

module.exports = router;