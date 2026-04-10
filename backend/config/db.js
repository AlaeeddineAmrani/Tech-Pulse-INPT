const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // On utilise la variable d'environnement du fichier .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connexion à MongoDB Atlas réussie !");
    } catch (err) {
        console.error("❌ Erreur de connexion :", err.message);
        process.exit(1); // Arrête le serveur si la connexion échoue
    }
};

module.exports = connectDB;