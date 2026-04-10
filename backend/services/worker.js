const cron = require('node-cron');
const Project = require('../models/Project');
const { fetchGithubData } = require('./githubService');

// 1. La fonction qui fait le travail lourd
const mettreAJourLesProjets = async () => {
    console.log("⚙️ [WORKER] Lancement de la mise à jour automatique...");
    
    try {
        // On récupère TOUS les projets qui sont déjà dans ta base MongoDB
        const projetsEnBase = await Project.find();

        // On boucle sur chaque projet
        for (let i = 0; i < projetsEnBase.length; i++) {
            const nomDuProjet = projetsEnBase[i].full_name;
            console.log(`📡 Interrogation de GitHub pour ${nomDuProjet}...`);

            // On va chercher les vraies données fraîches avec ton Token
            const nouvellesDonnees = await fetchGithubData(nomDuProjet);

            if (nouvellesDonnees) {
                // L'OPÉRATION MAGIQUE : On met à jour la Photo ($set) ET le Film ($push)
                await Project.updateOne(
                    { full_name: nomDuProjet }, // Qui on met à jour ?
                    {
                        // On écrase les anciens compteurs par les nouveaux
                        $set: {
                            current_stars: nouvellesDonnees.stargazers_count,
                            current_forks: nouvellesDonnees.forks_count
                        },
                        // On ajoute une nouvelle ligne dans l'historique
                        $push: {
                            history: {
                                date: new Date(), // La date exacte du jour
                                stars: nouvellesDonnees.stargazers_count,
                                forks: nouvellesDonnees.forks_count
                            }
                        }
                    }
                );
                console.log(`✅ ${nomDuProjet} mis à jour avec succès !`);
            }
        }
        console.log("🏁 [WORKER] Tous les projets sont à jour. Je retourne dormir.");
        
    } catch (erreur) {
        console.error("❌ [WORKER] Erreur critique :", erreur);
    }
};

// 2. Le Réveil (Cron)
const demarrerWorker = () => {
    // La syntaxe temporelle : "0 0 * * *" = À la minute 0, à l'heure 0 (Minuit), tous les jours.
    cron.schedule('0 0 * * *', mettreAJourLesProjets);
    
    console.log("⏰ Automatisme activé : Le serveur interrogera GitHub chaque jour à minuit.");
};

// On exporte juste la fonction pour l'allumer
module.exports = demarrerWorker;