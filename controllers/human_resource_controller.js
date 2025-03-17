const Resource = require('../models/human_resource_model.js');

// Display all Resources
const getHumanResources = async (req, res) => {
    try {
        const resource = await Resource.find({});
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Display browsed Resource
const getHumanResource = async (req, res) => {
    try {
        const {human_res_id} = req.params;
        const resource = await Resource.findOne({human_res_id: human_res_id});
        if (!resource) {
            res.status(404).json({message: 'Resource not found'});
        }
        
        res. status(200).json(resource)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Add Resource
const createHumanResource = async (req, res) => {
    try {
        const resource = await Resource.create(req.body);
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update Resource
const updateHumanResource = async (req, res) => {
    try {
        const {human_res_id} = req.params;
        const resource = await Resource.findOneAndUpdate({human_res_id: human_res_id}, req.body, {new: true});
        if (!resource) {
            res.status(404).json({message: 'Resource not found'});
        }

        const updatedResource = await Resource.findOne(resource);
        res.status(200).json(updatedResource);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete Resource
const deleteHumanResource = async (req, res) => {
    try {
        const {human_res_id} = req.params;
        const resource = await Resource.findOneAndDelete({human_res_id: human_res_id});
        if (!resource) {
            res.status(404).json({message: 'Resource not found'})
        }

        res.status(200).json({message: 'Resource Successfully Deleted!'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getHumanResources,
    getHumanResource,
    createHumanResource,
    updateHumanResource,
    deleteHumanResource
}