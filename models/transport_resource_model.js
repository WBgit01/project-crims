const mongoose = require('mongoose');

const TransResSchema = new mongoose.Schema (
    {
        transport_id: {
            type: String,
            required: true,
            unique: true
        },

        plateNumber: {
            type: String,
            required: true,
        },

        typeOfVehicle: {
            type: String,
            required: true,
        },

        fuel: {
            type: String,
            required: true,
        }
    }
);

const TransportResource = mongoose.model('TransportResource', TransResSchema);
module.exports = TransportResource;