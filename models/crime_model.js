const {request} = require('express');
const mongoose = require('mongoose');

const CrimeSchema = new mongoose.Schema (
     {
        id: {
            type: Number,
            required: true
        },

        categories: {
            type: String,
            required: true
        },

        types:{
            type: String,
            required: true
        },

        locations: {
            type: String,
            required: true
        },

        status: {
            type: String,
            required: true
        },
        
        reportedAt: {
            type: Date,
            default: Date.now
        }
    },

    {
        timestamps: {
            required: true
        }
    }
);

const Crime = mongoose.model('Product', ProuctSchema);
module.exports = Crime;