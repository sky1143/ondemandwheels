const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };


    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    console.log(distanceTime)
    const fare = {
        auto: baseFare.auto + (distanceTime.distance * perKmRate.auto) + (distanceTime.duration * perMinuteRate.auto),
        car: baseFare.car + (distanceTime.distance * perKmRate.car) + (distanceTime.duration * perMinuteRate.car),
        moto: baseFare.moto + (distanceTime.distance * perKmRate.moto) + (distanceTime.duration * perMinuteRate.moto)
    }

    console.log('Calculated Fare ', fare);

    return fare;



}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(10 ** (num - 1), 10 ** num - 1).toString()
        return otp
    }
    return generateOtp(num)
}
console.log(getOtp(4))

module.exports.createRide = async ({
    userId, pickup, destination, vehicleType, 
}) => {
    if (!userId || !pickup || !destination || !vehicleType) {
        throw new Error(' All fields are required ');

    }
    const validVehicleTypes = ['auto', 'car', 'moto'];
    if (!validVehicleTypes.includes(vehicleType)) {
        throw new Error('Invalid vehicle type');
    }

    const fare = await getFare(pickup, destination);

    try {

        const ride = await rideModel.create({
            userId,
            pickup,
            destination,
            fare: fare[vehicleType],
            otp: getOtp(6),
            status: 'pending' // Default status
        });

        return ride;

    } catch (error) {
        throw new Error(`Error creating ride: ${error.message}`);
    }

}


