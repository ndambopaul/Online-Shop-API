const User = require("../models/users");
const bcrypt = require('bcryptjs');

const resetPassword = async(req, res) => {
    const { body: { password, repeat_password }, params: { token } } = req;

    if(password !== repeat_password) return res.send({"message": "Passwords do not match!!"}).status(400);

    const user = await User.findOne({resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() }});
  
    if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' });
    }
  
    // Reset password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.send({"message": "Password successfully changed!!, proceed to login!!"}).status(200)
};

module.exports = {
    resetPassword
}