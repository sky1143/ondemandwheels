const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');

const Ride = sequelize.define('Ride', {
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users', // 👈 Table name in PostgreSQL (case-sensitive)
            key: 'id', // 👈 Column name in Users table
        },
    },
    captainId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Captains',
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
});

Ride.associate = (models) => {
    Ride.belongsTo(models.User, { foreignKey: 'userId', as:'user' });
    Ride.belongsTo(models.Captain, { foreignKey: 'captainId' , as : 'captain' });
}

module.exports = Ride;