const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service')

module.exports.createRide = async (req, res, next) => {
    // console.log("🚀 REQ.USER:", req.user);  // 👈 Debugging log

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;

    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    try {
        const ride = await rideService.createRide({
            userId: req.user.id,
            pickup,
            destination,
            vehicleType
        });

        const pickupCoordinates = await mapService.getAddressCordinate(pickup);
        console.log("Pickup Coordinates",pickupCoordinates);
        
        const captainInRadius = await mapService.getCaptainLocation(pickupCoordinates.lat, pickupCoordinates.lng, 2)
        console.log("Captain Radius",captainInRadius)
        
        
        res.status(201).json({
            ride,
            nearbyCaptains: captainInRadius
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.getFare = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }
    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare)
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

}