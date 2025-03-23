const express = require('express')
const router = express.Router();

const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').trim().escape().isString().withMessage('Pickup address must be string').isLength({ min: 3, max: 100 }).withMessage('Invalid pickup address'),
    body('destination').trim().escape().isString().withMessage('destination address must be string').isLength({ min: 3, max: 100}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicletype'),
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3, max: 100 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3, max: 100 }).withMessage('Invalid destination address'),
    rideController.getFare
)

module.exports = router;