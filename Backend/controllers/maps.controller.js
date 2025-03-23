const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coorinates not found ' });
    }

}
module.exports.getDistanceTime = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    try {
        console.log(`Calculating distance and time between ${origin} and ${destination}`);
        const result = await mapService.getDistanceTime(origin, destination);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching distance and time:', error.message);

        res.status(500).json({ message: error.message });
    }
};

module.exports.getAutoCompleteSuggestion = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array })
    }

    const { input } = req.query;

    try {
        const suggestion = await mapService.getAutoCompleteSuggestion(input);
        res.status(200).json(suggestion);

    } catch (error) {
        console.error("Error fetching suggestions:", error.message);
        res.status(500).json({ message: 'Failed to fetch suggestions' });
    }
}