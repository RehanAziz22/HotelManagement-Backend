const mongoose = require("mongoose");

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.DBURI);
        console.log("Connected to MongoDB...");
    } catch (error) {
        console.error("Connection to MongoDB failed:", error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = ConnectDB;
