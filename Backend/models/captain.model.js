const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Captain = sequelize.define('Captain', {

    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 255]
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [3, 255]
        }
    },
    fullname: {
        type: DataTypes.VIRTUAL, // This field is not stored in the DB
        get() {
            return `${this.firstname} ${this.lastname || ''}`.trim();
        },
        set(value) {
            const names = value.split(' ');
            this.firstname = names[0]; // First word as firstname
            this.lastname = names.slice(1).join(' ') || null; // Rest as lastname
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            len: [5, 255]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    socketId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'banned'),
        defaultValue: 'inactive'
    },
    vehicleColor: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [3, 255]
        }
    },
    vehiclePlate: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [3, 255]
        }
    },
    vehicleCapacity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    vehicleType: {
        type: DataTypes.ENUM('car', 'motorcycle', 'auto'),
        allowNull: true
    },
    location: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: true
    }
}, {
    hooks: {
        beforeCreate: async (captain) => {
            const salt = await bcrypt.genSalt(10);
            captain.password = await bcrypt.hash(captain.password, salt);
        }
    }
});

// Instance method to hash password dynamically

Captain.prototype.hashedPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);

};


// Generate JWT Token Method
Captain.prototype.generateAuthToken = function () {
    return jwt.sign(
        { id: this.id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

//Compare password method
Captain.prototype.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = Captain;

