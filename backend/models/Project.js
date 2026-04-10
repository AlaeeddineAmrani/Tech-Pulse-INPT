const mongoose = require('mongoose');

// On définit le "moule" (Schema)
const projectSchema = new mongoose.Schema({
    full_name: { type: String, required: true, unique: true },
    description: String,
    language: String,
    stargazers_count: Number,
    forks_count: Number,
    // On peut même ajouter un tableau pour l'historique (pour les graphiques !)
    history: [{
        date: { type: Date, default: Date.now },
        stars: Number
    }]
}, { timestamps: true }); // Ajoute automatiquement 'createdAt' et 'updatedAt'

// On transforme le moule en un "Modèle" exploitable et on l'exporte
module.exports = mongoose.model('Project', projectSchema);