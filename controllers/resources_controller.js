// // Function to select the correct model
// const getModel = (resourceType) => {
//     if (resourceType === 'human') return HumanResource;
//     if (resourceType === 'transport') return TransportResource;
//     return null;
// };

// // Display all resources
// const getResources = async (req, res) => {
//     try {
//         const { resourceType } = req.params;
//         const Model = getModel(resourceType);

//         if (!Model) {
//             return res.status(400).json({ message: "Invalid resource type" });
//         }

//         const resources = await Model.find({});
//         res.status(200).json(resources);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Display a single resource
// const getResource = async (req, res) => {
//     try {
//         const { resourceType, id } = req.params;
//         const Model = getModel(resourceType);

//         if (!Model) {
//             return res.status(400).json({ message: "Invalid resource type" });
//         }

//         const resource = await Model.findById(id);
//         if (!resource) {
//             return res.status(404).json({ message: "Resource not found" });
//         }

//         res.status(200).json(resource);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Create a new resource
// const createResource = async (req, res) => {
//     try {
//         const { resourceType } = req.params;
//         const Model = getModel(resourceType);

//         if (!Model) {
//             return res.status(400).json({ message: "Invalid resource type" });
//         }

//         const resource = await Model.create(req.body);
//         res.status(201).json(resource);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update a resource
// const updateResource = async (req, res) => {
//     try {
//         const { resourceType, id } = req.params;
//         const Model = getModel(resourceType);

//         if (!Model) {
//             return res.status(400).json({ message: "Invalid resource type" });
//         }

//         const resource = await Model.findByIdAndUpdate(id, req.body, { new: true });
//         if (!resource) {
//             return res.status(404).json({ message: "Resource not found" });
//         }

//         res.status(200).json(resource);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Delete a resource
// const deleteResource = async (req, res) => {
//     try {
//         const { resourceType, id } = req.params;
//         const Model = getModel(resourceType);

//         if (!Model) {
//             return res.status(400).json({ message: "Invalid resource type" });
//         }

//         const resource = await Model.findByIdAndDelete(id);
//         if (!resource) {
//             return res.status(404).json({ message: "Resource not found" });
//         }

//         res.status(200).json({ message: "Resource successfully deleted!" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = {
//     getResources,
//     getResource,
//     createResource,
//     updateResource,
//     deleteResource
// };
