const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { body, validationResult } = require('express-validator');
const User = require("../models/users");
const transporter = require("../mailer/transporter");


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
        const activationToken = crypto.randomBytes(20).toString('hex');
        user.activationToken = activationToken;
        user.activationTokenExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();


        // Sending User Activation Email
        const mailOptions = {
            from: 'paulgomycode@gmail.com',
            to: user.email,
            subject: 'User Account Activation',
            text: `You are receiving this email email because you created an account on Cloud Store.\n\n`
              + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
              + `http://${req.headers.host}/users/activate-user/${activationToken}\n\n`
              + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
          };
      
        await transporter.sendMail(mailOptions);

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    registerUser
}