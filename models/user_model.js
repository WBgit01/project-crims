const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            required: true,
            enum: ['admin', 'police', 'community'],
            default: 'community',
        },

        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },

        address: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ['active', 'inactive', 'banned'],
            default: 'active',
        },

        lastLogin: {
            type: Date,
            default: Date.now,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },

        updatedAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
);

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check password validity
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
