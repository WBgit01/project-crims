const express = require('express');
const router = express.Router();
const {getResources, getResource, createResource, updateResource, deleteResource} = require('../controllers/resources_controller.js');

router.get('/', getResources);
router.get('/:id', getResource);
router.post('/', createResource);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);

module.exports = router;