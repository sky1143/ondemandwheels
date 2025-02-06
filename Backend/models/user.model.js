const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = sequelize.define('User', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 255 ,'Firstname must be at least 3 characters long']
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [3, 255, "Lastname must be at least 3 characters long"]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        lowercase: true,
        unique: true,
        validate: {
            isEmail: true,
            len: [5, 255]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        select: false,
    },
    socketId: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            user.password = await user.hashedPassword(user.password);
        }
    }
});

 // Instance method to hash password dynamically
User.prototype.hashedPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Generate JWT Token Method
User.prototype.generateAuthToken = function () {
    return jwt.sign(
        { id: this.id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// Compare Password Method
User.prototype.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;
