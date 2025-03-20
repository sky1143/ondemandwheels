const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');

async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        bike: 20
    };


    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };

    const fare = {
        auto: baseFare.auto + (distanceTime.distance * perKmRate.auto) + (distanceTime.time * perMinuteRate.auto),
        car: baseFare.car + (distanceTime.distance * perKmRate.car) + (distanceTime.time * perMinuteRate.car),
        motorcycle: baseFare.motorcycle + (distanceTime.distance * perKmRate.motorcycle) + (distanceTime.time * perMinuteRate.motorcycle)
    }

    return fare;

}


module.exports.createRide = async ({
    userId, pickup, destination, vehicleType
}) => {
    if ( !userId || !pickup || !destination || !vehicleType) {
        throw new Error(' All fields are required ');

    }
    const validVehicleTypes = ['auto', 'car', 'motorcycle'];
    if (!validVehicleTypes.includes(vehicleType)) {
        throw new Error('Invalid vehicle type');
    }

    const fare = await getFare(pickup, destination);
    console(fare);
    try {
      
        const ride = await rideModel.create({
            userId, 
            captainId, 
            pickup,
            destination,
            fare: fare[vehicleType],
            status: 'pending' // Default status
        });
        
        return ride;

    } catch (error) {
        throw new Error(`Error creating ride: ${error.message}`);
    }
   
}


