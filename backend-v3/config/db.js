const mongoose = require("mongoose");

// Connects to MongoDB using the URI stored in the .env file.
// Keeping the URI in .env (instead of hardcoding it) means your
// database password never ends up in your source code / GitHub.
async function connectDB() {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error("MONGO_URI is not defined in your .env file");
        }

        await mongoose.connect(uri);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1); // stop the server if the database isn't reachable
    }
}

module.exports = connectDB;
