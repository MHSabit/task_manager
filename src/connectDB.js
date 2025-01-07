require('dotenv').config();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

console.log(process.env.MONGODB_URI);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log('MongoDB Connected');
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;