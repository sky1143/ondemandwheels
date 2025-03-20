const express = require('express')
const router = express.Router();

const { body } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    // body('userId').isString().withMessage('User ID must be a string').isLength({ min: 24, max: 24 }).withMessage('Invalid user id'),
    body('pickup').isString().withMessage('Pickup address must be string').isLength({ min: 3, max: 24 }).withMessage('Invalid pickup address'),
    body('destination').isString().withMessage('destination address must be string').isLength({ min: 3, max: 24 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().withMessage('vehicleType must be  string').isLength({ min: 3, max: 24 }).withMessage('Invalid vehicletype'),
    rideController.createRide
)

module.exports = router;