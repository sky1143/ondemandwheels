const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    console.log("Incoming Request Body:", req.body); // Debugging log

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);
    const { firstname, lastname, email, password } = req.body;

    try {
        // ✅ Fix: Properly check if the user exists
        const isUserAlreadyExist = await userModel.findOne({ where: { email } });

        if (isUserAlreadyExist) {
            console.log("User already exists:", isUserAlreadyExist.dataValues);
            return res.status(400).json({ message: 'User Already Exists' }); // ✅ Stops execution
        }

        // ✅ If no existing user, create a new one
        const user = await userService.createUser({
            firstname,
            lastname,
            email,
            password,
        });

        const token = user.generateAuthToken();

        return res.status(201).json({ token, user });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

module.exports.loginUser = async (req, res, next) => {
    console.log("Incoming Request Body:", req.body); // Debugging log

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log("Extracted email:", email);
    console.log("Extracted password:", password);

    try {
        const user = await userModel.findOne({ where: { email } });

        if (!user) {
            console.log("User not found for email:", email);
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        console.log("User found:", user.dataValues);

        // ✅ Compare password using instance method
        const isMatch = await user.comparePassword(password);
        console.log("Password match result:", isMatch);

        if (!isMatch) {
            console.log("Password does not match for user:", user.email);
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // ✅ Generate and send token
        const token = user.generateAuthToken();
        res.cookie('token', token);

        console.log("Generated token:", token);

        return res.status(200).json({ token, user });

    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Error logging in user", error: error.message });
    }
};

module.exports.profile = async (req, res, next) => {
    return res.status(200).json(req.user);
};

module.exports.logout = async (req, res, next) => {
    res.clearCookie('token');

    // ✅ Fix: Handle cases where req.headers.authorization is undefined
    const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }

    await blacklistTokenModel.create({ token });

    return res.status(200).json({ message: "Logout successful" });
};
