const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
    "/register",
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('firstname').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

        // Fix: Validate vehicle fields using flattened structure (not nested)
        body('vehicleColor').isLength({ min: 3 }).withMessage('Color must be at least 3 characters'),
        body('vehiclePlate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters'),
        body('vehicleCapacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
        body('vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
    ],
    captainController.registerCaptain
);

module.exports = router;
