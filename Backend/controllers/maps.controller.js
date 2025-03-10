const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');  

module.exports.getCoordinates = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
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