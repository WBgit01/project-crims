const Resource = require('../resources_model.js');

// Display all Resources
const getResource = async (req, res) => {
    try {
        const resource = await Resource.find({});
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Display browsed Resource
const getResources = async (req, res) => {
    try {
        const {id} = req.params;
        const resource = await Resource.findById(id);
        res. status(200).json(resource)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Report Resource
const createResource = async (req, res) => {
    try {
        const resource = await Resource.create(req.body);
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update Resource
const updateResource = async (req, res) => {
    try {
        const {id} = req.params;
        const resource = await Resource.findByIdAndUpdate(id, req.body);
        if (!Resource) {
            res.status(404).json({message: 'Resource not found'});
        }

        const updatedResource = await Resource.findById(id);
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete Resource
const deleteResource = async (req, res) => {
    try {
        const {id} = req.params;
        const resource = await Resource.findByIdAndDelet(id);
        if (!resource) {
            res.status(404).json({message: 'Resource not found'})
        }

        res.status(200).json({message: 'Resource Successfully Deleted!'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getResources,
    getResource,
    createResource,
    updateResource,
    deleteResource
}