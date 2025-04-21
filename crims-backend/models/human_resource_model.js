const mongoose = require('mongoose');

const HumanResSchema = new mongoose.Schema (
    {
        human_res_id: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
        },

        equipment: {
            type: [String],
            required: true,
        },

        position: {
            type: String,
            required: true,
        }
    }
);

const HumanResource = mongoose.model('HumanResource', HumanResSchema);
module.exports = HumanResource;