const express = require('express')
const router = express.Router();

const { body } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().withMessage('Pickup address must be string').isLength({ min: 3, max: 24 }).withMessage('Invalid pickup address'),
    body('destination').isString().withMessage('destination address must be string').isLength({ min: 3, max: 24 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('Invalid vehicletype'),
    rideController.createRide
)

module.exports = router;