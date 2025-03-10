const Crime = require('../models/crime_model.js');

// Display all crimes
const getCrimes = async (req, res) => {
    try {
        const crimes = await Crime.find({});
        res.status(200).json(crimes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Display browsed crime
const getCrime = async (req, res) => {
    try {
        const {id} = req.params;
        const crime = await Crime.findById(id);
        if (!crime) {
            res.status(404).json({message: "Crime not found"});
        }

        res. status(200).json(crime)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Report crime
const reportCrime = async (req, res) => {
    try {
        const crime = await Crime.create(req.body);
        res.status(200).json(crime);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update crime
const updateCrime = async (req, res) => {
    try {
        const {id} = req.params;
        const crime = await Crime.findByIdAndUpdate(id, req.body, { new: true });
        if (!crime) {
            res.status(404).json({message: "Crime not found"});
        }
        
        res.status(200).json(crime);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getCrimes,
    getCrime,
    reportCrime,
    updateCrime
}