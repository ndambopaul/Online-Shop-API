const User = require("../models/users");


const getUsers = async (req, res) => {
    const users = await User.find({})
    res.send ({count: users.length, users: users}).status(200);
};

const createUser = async(req, res) => {

    const user = req.body;
    const newUser = await User.create(user);
    res.send(newUser).status(201);
};

const getUserById = async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById({'_id': id});

        if(!user){
            return res.send({'error': `No user with id ${id} found`}).status(404);
        }

        res.send(user).status(200);
    } catch (error) {
        console.log(error);
        return res.status(500).send({'error': 'Internal server error'});
    }
}


const updateUser = async(req, res) => {
    const id = req.params.id;
    const data = req.body

    try {
        const user = await user.findByIdAndUpdate(id, {...data}, {new : true});

        if(!user){
            return res.send({'error': `No user with id ${id} found`}).status(404);
        }
        res.send(user).status(201);
    } catch (error) {
        console.log(error);
        return res.send({'error': 'Internal server error'}).status(500);
    }

}


const deleteUser = async(req, res) => {
    const id = req.params.id;
    
    try {
        const deletedUser = await User.findByIdAndDelete({'_id': id})

        if(!deleted){
            return res.send({'error': `No user with id ${id} found`}).status(404);
        }

        res.send({'success': 'User deleted successfully'}).status(200);
    } catch (error) {
        console.log(error);
        return res.send({'error': 'Internal server error'}).status(500);
    }

}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}