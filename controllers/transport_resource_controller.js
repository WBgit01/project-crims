const Resource = require('../models/transport_resource_model.js');

// Display all Resources
const getTransportResources = async (req, res) => {
    try {
        const resource = await Resource.find({});
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Display browsed Resource
const getTransportResource = async (req, res) => {
    try {
        const {transport_id} = req.params;
        const resource = await Resource.findOne({transport_id: transport_id});
        res.status(200).json(resource)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Add Resource
const createTransportResource = async (req, res) => {
    try {
        const resource = await Resource.create(req.body);
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update Resource
const updateTransportResource = async (req, res) => {
    try {
        const {transport_id} = req.params;
        const resource = await Resource.findOneAndUpdate({transport_id: transport_id}, req.body, {new: true});
        if (!Resource) {
            res.status(404).json({message: 'Resource not found'});
        }

        const updatedResource = await Resource.findOne(transport_id);
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete Resource
const deleteTransportResource = async (req, res) => {
    try {
        const {transport_id} = req.params;
        const resource = await Resource.findOneAndDelete({transport_id: transport_id});
        if (!resource) {
            res.status(404).json({message: 'Resource not found'})
        }

        res.status(200).json({message: 'Resource Successfully Deleted!'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getTransportResources,
    getTransportResource,
    createTransportResource,
    updateTransportResource,
    deleteTransportResource
}