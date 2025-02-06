const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

module.exports.registerCaptain = async (req, res, next) => {
    console.log("Incoming request Body:", req.body); // debugging log

     // Validate Request Data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { firstname, lastname, email,  password, vehicleColor, vehiclePlate, vehicleCapacity, vehicleType } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ where:{ email }});

    if(isCaptainAlreadyExist) {
        res.status(400).json({ message: 'Captain is Already exists' })
    }

    

    // Create Captain using Service
    const captain = await captainService.createCaptain({
        firstname,
        lastname,
        email,
        password,
        vehicleColor,
        vehiclePlate,
        vehicleCapacity,
        vehicleType
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain})

}

