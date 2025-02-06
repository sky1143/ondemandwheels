const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blacklistToken = require('../models/blacklistToken.model')
const captainModel = require('../models/captain.model');
const { where } = require('sequelize');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    const isBlacklisted = await blacklistToken.findOne({where:{ token: token }});
    
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ where: { id: decoded.id } })  
        req.user = user;
        return next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log(token)

    if (!token) {
        res.status(401).json({ message: 'Unauthorised Access' })
    }
    const isBlacklisted = await blacklistToken.findOne({where:{ token: token }});
    console.log(isBlacklisted)

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized Access' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findOne({ where: { id: decoded.id } })
        req.captain = captain;
        return next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Unauthorized Access" });
    }
}