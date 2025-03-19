const express = require('express')
const router = express.Router();

const { body } = require('express-validator');


router.post('/create',
    body('userId').isString().withMessage('User ID must be a string').isLength({ min: 24, max: 24 }).withMessage('Invalid user id'),    
    body('pickup').isString().withMessage('Picku address must be string').isLength({ min: 24, max: 24 }).withMessage('Invalid pickup address'),
    body('destination').isString().withMessage('destination address must be string').isLength({ min: 24, max: 24 }).withMessage('Invalid destination address')

)

module.exports = router;