const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require("../models/users");


const registerUser = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Check if user already exists
    const { email, password, username } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({
            email,
            username,
            password: hashedPassword
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ user: { id: user.id } }, '1234', { expiresIn: '1h' });
        user.token = token
        await user.save()

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    registerUser
}