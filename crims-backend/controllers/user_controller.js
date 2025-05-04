const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
};

// Get a user by ID
const getUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ code: 'E1003', message: 'User not found', trace_id: userId });
        }

        const { password, ...userData } = user.toObject();
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
};

// Register a new user
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, role, phoneNumber, station } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ code: 'E1002', message: 'User already exists' });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            role,
            phoneNumber,
            station,
        });

        await newUser.save();

        const { password: pwd, ...userDetails } = newUser.toObject();

        res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            user: userDetails,
        });
    } catch (error) {
        res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ code: 'E1003', message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ code: 'E1001', message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '3h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
};

// Update user information
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ code: 'E1003', message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
};

// Partially update user information
const patchUser = async (req, res) => {
    const { userId } = req.params;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ code: 'E3001', message: 'No fields provided for update' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ code: 'E1003', message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
};


// Delete a user
const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ code: 'E1003', message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ code: 'E5001', message: 'Internal server error', trace_id: error.message });
    }
};

module.exports = { getAllUsers, getUser, registerUser, loginUser, updateUser, patchUser, deleteUser };
