const { json } = require('express');
const Crime = require('../models/crime_model.js');

// Display all crimes
const getCrimes = async (req, res) => {
    try {
        const crimes = await Crime.find({});
        res.status(200).json(crimes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Display browsed crime
const getCrime = async (req, res) => {
    try {
        const { crime_id } = req.params;
        const crime = await Crime.findOne({crime_id: crime_id});
        if (!crime) {
            return res.status(404).json({ message: 'Crime not found' });
        }

        res.status(200).json(crime);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Report crime
const reportCrime = async (req, res) => {
    try {
        const crime = await Crime.create(req.body);
        res.status(201).json(crime);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update crime
const updateCrime = async (req, res) => {
    try {
        const { crime_id } = req.params;
        const crime = await Crime.findOneAndUpdate({crime_id: crime_id}, req.body, { new: true });
        if (!crime) {
            return res.status(404).json({ message: 'Crime not found' });
        }

        res.status(200).json(crime);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Partially update crime
const patchCrime = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }

        const { crime_id } = req.params;
        const crime = await Crime.findOneAndUpdate({ crime_id: crime_id }, req.body, { new: true });
        if (!crime) {
            return res.status(404).json({ message: 'Crime not found' });
        }
        res.status(200).json(crime);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete crime
const deleteCrime = async (req, res) => {
    try {
        const { crime_id } = req.params;
        const crime = await Crime.findOneAndDelete({crime_id: crime_id});
        if (!crime) {
            return res.status(404).json({message: 'Crime not found'});
        }

        res.status(200).json({message: 'Crime Successffuly Deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getCrimes,
    getCrime,
    reportCrime,
    updateCrime,
    patchCrime,
    deleteCrime
};
