
const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/notebook";
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit the process if the connection fails
    }
};
module.exports = connectToMongo;

