const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    console.log("Incoming request Body:", req.body); // debugging log

    // Validate Request Data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { firstname, lastname, email, password, vehicleColor, vehiclePlate, vehicleCapacity, vehicleType } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ where: { email } });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain is Already exists' })
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
    res.status(201).json({ token, captain })

}

module.exports.loginCaptain = async (req, res, next) => {
    console.log('Incoming request Body :', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("validation Errors", errors.array())
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log('Extraced email', email);
    console.log('Extraced password', password);

    try {
        const captain = await captainModel.findOne({
            where: { email },
        })

        if (!captain) {
            console.log('User not  found', email)
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        console.log("User found", captain.dataValues)

        const isMatch = await captain.comparePassword(password)
        console.log("Password Match result", isMatch)

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials ' })
        }

        const token = captain.generateAuthToken()
        res.cookie('token', token)

        console.log("Generated token", token);

        return res.status(200).json({ token, captain })
    } catch (error) {
        console.error("Error logging in Capital", error);
        return res.status(500).json({ message: 'Error logging in capital', error: error.message })
    }


}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split('')[1]

    await blacklistTokenModel.create({ token })

    res.status(200).json( { message:' Captain logout successfull'})

}
