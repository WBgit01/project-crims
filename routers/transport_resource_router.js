const express = require('express');
const router = express.Router();
const {getTransportResources, getTransportResource, createTransportResource, updateTransportResource, deleteTransportResource} = require('../controllers/transport_resource_controller.js');

router.get('/', getTransportResources);
router.get('/:transport_id', getTransportResource);
router.post('/', createTransportResource);
router.put('/:transport_id', updateTransportResource);
router.delete('/:transport_id', deleteTransportResource);

module.exports = router;