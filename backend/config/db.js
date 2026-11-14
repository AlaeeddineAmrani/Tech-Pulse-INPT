const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.warn("⚠️ MONGO_URI is not set. Database features will be unavailable.");
            return;
        }
        await mongoose.connect(uri);
        console.log("✅ Connexion à la base de données réussie !");
    } catch (err) {
        console.error("❌ Erreur de connexion :", err.message);
        // In serverless / production, don't kill the process — let endpoints
        // return errors gracefully instead of crashing the entire function.
        if (!process.env.VERCEL) {
            process.exit(1);
        }
    }
};

module.exports = connectDB;
