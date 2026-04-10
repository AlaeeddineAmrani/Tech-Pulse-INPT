require('dotenv').config(); // On active le fichier .env (pour lire l'URI et le Token)
const PORT = process.env.PORT || 2500;
const express = require('express');
const cors = require('cors'); // pour que React puisse parler
const connectDB = require('./config/db'); // On importe la Prise
const demarrerWorker = require('./services/worker'); // On importe le réveil

const app = express();

// On branche la Prise à la base de données !
connectDB(); 

app.use(cors()); // Autorise les requêtes extérieures
app.use(express.json()); // Permet à Express de lire le JSON

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);


demarrerWorker(); // On allume le réveil en tâche de fond !

app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
});