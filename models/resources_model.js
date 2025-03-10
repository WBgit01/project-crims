const {request} = require('express');
const mongoose = require('mongoose');

const ResourcesSchema = mongoose.Schema (
     {
        HumanResources: {

            id: {
                type: int,
                required: true,
            },
    
            name: {
                type: String,
                required: true
            },

            equipment: {
                type: String,
                required: true
            },

            position: {
                type: String,
                required: true
            }
        },

        TransportResources: {

            plateNumber: {
                type: String,
                required: true
            },

            typeOfVehicle: {
                type: String,
                required: true
            },

            fuel: {
                type: String,
                required: true
            }
        }

    },

    {
        timestamps: {
            type: Date,
            default: Date.now
        }
    }
);

const Resources = mongoose.model('Product', ResourcesSchema);
module.exports = Resources;