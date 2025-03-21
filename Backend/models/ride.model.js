const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');
const User = require('./user.model');
const Captain = require('./captain.model');

const Ride = sequelize.define('Ride', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // 👈 Table name in PostgreSQL (case-sensitive)
            key: 'id', // 👈 Column name in Users table
        },
    },
    captainId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Captain,
            key: 'id',
        },

    },
    pickup: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fare: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "accepted", "ongoing", "completed", "cancelled"),
        default: 'pending',
    },
    duration: {
        type: DataTypes.INTEGER,
    },
    distance: {
        type: DataTypes.FLOAT,
    },
    paymentId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    signature: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


Ride.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Ride.belongsTo(Captain, { foreignKey: 'captainId', as: 'captain' });

module.exports = Ride;