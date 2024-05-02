const mongoose = require('mongoose');

const connectionString = "mongodb://localhost:27017/ecommercedb";

const connect_database = async () => {
    await mongoose.connect(connectionString).then (() => console.log("Database connected successfully!"))
};

module.exports.connect_database = connect_database;