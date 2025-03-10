const express = require('express');
const router = express.Router();
const {getResources, getResource, createResource, updateResource, deleteResource} = require('../controllers/resources_controller.js');

router.get('/resources', getResources);
router.get('/resouces/:id', getResource);
router.post('/resources', createResource);
router.put('/resource/:id', updateResource);
router.delete('/resource/:id', deleteResource);

module.exports = router;