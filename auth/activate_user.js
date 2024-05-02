const User = require("../models/users");

const activateUser = async(req, res) => {
    const { token } = req.params;

    try {
        //const user = await User.findOne({"activationToken": token})
        const user = await User.findOne({activationToken: token, activationTokenExpires: { $gt: Date.now() }});
        if(!user) return res.status(404).send({"error": `User with token: ${token} not found!!!`})
        user.active = true
        await user.save()

        return res.status(200).send({"message": "User activated successfully!!!"})

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({"error": `${error.message}`})
    }
}

module.exports = {
    activateUser
}