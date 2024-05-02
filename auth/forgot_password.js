const crypto = require('crypto');
const User = require("../models/users");

const transporter = require("../mailer/transporter");

const forgotPassword = async(req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({"email": email})

        if(!user) return res.send({"error": `User with email: ${email} not found!!`}).status(404)

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        const mailOptions = {
            from: 'paulgomycode@gmail.com',
            to: user.email,
            subject: 'Password Reset Link',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
              + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
              + `http://${req.headers.host}/users/reset-password/${resetToken}\n\n`
              + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
          };
      
        await transporter.sendMail(mailOptions);

        res.send({"email": email, "user": user}).status(200)

    } catch (error) {
        console.log(error);
        return res.send({"error": `${error.message}`}).status(500)
    }
}


module.exports = {
    forgotPassword
}