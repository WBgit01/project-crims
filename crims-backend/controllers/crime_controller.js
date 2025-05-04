const { json } = require('express');
const Crime = require('../models/crime_model.js');
const Counter = require('../models/counter_model.js');

// Display all crimes
const getCrimes = async (req, res) => {
    try {
        const crimes = await Crime.find({});
        res.status(200).json(crimes);
    } catch (error) {
        res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
};

// Display browsed crime
const getCrime = async (req, res) => {
    try {
        const { crime_id } = req.params;
        const crime = await Crime.findOne({crime_id: crime_id});
        if (!crime) {
            return res.status(404).json({ code: 'E2001', message: 'Crime not found', trace_id: crime_id });
        }

        res.status(200).json(crime);
    } catch (error) {
        res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
};

// Report crime
const reportCrime = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            { name: 'crime' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const nextSeq = counter.seq.toString().padStart(8, '0');
        const crime_id = `CRIME-${nextSeq}`;

        const crimeData = {
            crime_id,
            ...req.body
        };

        const crime = await Crime.create(crimeData);
        res.status(201).json(crime);
    } catch (error) {
        res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
};

// Update crime
const updateCrime = async (req, res) => {
    try {
        const { crime_id } = req.params;
        const crime = await Crime.findOneAndUpdate({crime_id: crime_id}, req.body, { new: true });
        if (!crime) {
            return res.status(404).json({ code: 'E2001', message: 'Crime not found', trace_id: crime_id });
        }

        res.status(200).json(crime);
    } catch (error) {
        res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
};

// Partially update crime
const patchCrime = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ code: 'E3001', message: 'No fields provided for update' });
        }

        const { crime_id } = req.params;
        const crime = await Crime.findOneAndUpdate({ crime_id: crime_id }, req.body, { new: true });
        if (!crime) {
            return res.status(404).json({ code: 'E2001', message: 'Crime not found', trace_id: crime_id });
        }
        res.status(200).json(crime);
    } catch (error) {
        res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
};

// Delete crime
const deleteCrime = async (req, res) => {
    try {
        const { crime_id } = req.params;
        const crime = await Crime.findOneAndDelete({crime_id: crime_id});
        if (!crime) {
            return res.status(404).json({ code: 'E2001', message: 'Crime not found', trace_id: crime_id });
        }

        res.status(200).json({message: 'Crime Successffuly Deleted'});
    } catch (error) {
        res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
};

// Filter crime statistics
const formatDate = (date, timeFrame) => {
    const d = new Date(date);
    if (timeFrame === 'weekly') {
      const week = Math.ceil((d.getDate() - d.getDay()) / 7);
      return `${d.getFullYear()}-W${week}`;
    } else if (timeFrame === 'monthly') {
      return `${d.getFullYear()}-${d.getMonth() + 1}`;
    } else if (timeFrame === 'yearly') {
      return `${d.getFullYear()}`;
    }
  };
  
  const getCrimeTrends = async (req, res) => {
    try {
      const { timeFrame } = req.params;
      const crimes = await Crime.find({});
  
      const crimeTrends = crimes.reduce((acc, crime) => {
        const formattedDate = formatDate(crime.reportedAt, timeFrame);
        if (!acc[formattedDate]) {
          acc[formattedDate] = { date: formattedDate, crimeCount: 0 };
        }
        acc[formattedDate].crimeCount++;
        return acc;
      }, {});
  
      const result = Object.values(crimeTrends);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
  };

module.exports = {
    getCrimes,
    getCrime,
    reportCrime,
    updateCrime,
    patchCrime,
    deleteCrime,
    getCrimeTrends
};
