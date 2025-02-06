const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname, lastname, email, password,
    vehicleColor, vehiclePlate, vehicleCapacity, vehicleType
}) => {
    // Validation: Ensure all required fields are present
    if (!firstname || !email || !password || !vehicleColor || !vehiclePlate || !vehicleCapacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    // Create the Captain instance with correct field mappings
    const captain = await captainModel.create({
        firstname,
        lastname, // lastname is optional as per model
        email,
        password,
        vehicleColor,
        vehiclePlate,
        vehicleCapacity,
        vehicleType
    });

    return captain;
};
