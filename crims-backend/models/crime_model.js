const {request} = require('express');
const mongoose = require('mongoose');

const CrimeSchema = new mongoose.Schema (
     {
        crime_id: {
            type: String,
            required: true,
            unique: true
        },

        categories: {
            type: String,
            required: true
        },

        types:{
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        map_location: {
            type: { type: String, enum: ['Point'], required: true },
            coordinates: { type: [Number], required: true },
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

const Crime = mongoose.model('Crime', CrimeSchema);
module.exports = Crime;