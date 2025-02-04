const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    console.log("Incoming Request Body:", req.body); // debugging log

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);
    const { firstname, lastname, email, password } = req.body;

   try {
    const user = await userService.createUser({
        firstname,
        lastname,
        email,
        password
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
   } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
   }
};

module.exports.loginUser = async (req, res, next) => {
    console.log("Incoming Request Body:", req.body); // debugging log

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    

    const { email, password } = req.body;
    console.log("Extracted email" , email);
    console.log("Extracted password" , password);

    try {
        const user = await userModel.findOne({ 
            where:{ email },
           
        });
    
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(401).json({ message: 'Invalid Creadentials' });
        }
        console.log("User found:", user.dataValues);
    
        // Compare password using instance method

        const isMatch = await user.comparePassword(password);
        console.log("Password match result", isMatch);
    
        if (!isMatch) {
            console.log("Password does not match for user:", user.email);
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
    
        const token = user.generateAuthToken();
        console.log("Generated token:", token);
    
        res.status(200).json({ token, user });
        
    } catch (error) {
        console.error("Error logging in user:", error); // Print full error in the console
        res.status(500).json({ message: "Error logging in user" , error: error.message });
        
    }

}