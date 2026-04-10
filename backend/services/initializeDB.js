// 1. Les imports
const { fetchGithubData } = require('./githubService.js'); 
const Project = require('../models/Project.js');
const connectDB = require('../config/db.js');
require('dotenv').config(); // Pour lire le Token et l'URI

// 2. Ta liste parfaite
const tabProjects = ["facebook/react", "vuejs/vue", "angular/angular", "twbs/bootstrap", "tailwindlabs/tailwindcss", "nodejs/node", "expressjs/express", "django/django", "spring-projects/spring-boot", "laravel/laravel", "tensorflow/tensorflow", "facebook/react-native", "torvalds/linux", "microsoft/vscode", "microsoft/TypeScript"];

// 3. On englobe tout dans une fonction "async"
async function initialiserBaseDeDonnees() {
    try {
        // On branche la base de données en premier !
        await connectDB();
        console.log("⏳ Début de la récupération des données GitHub...");

        for(let i = 0; i < tabProjects.length; i++) {
            const nomDuProjet = tabProjects[i];
            console.log(`Traitement de ${nomDuProjet}...`);

            // On ATTEND la réponse de GitHub
            const data = await fetchGithubData(nomDuProjet);
            
            // Si Github a bien répondu
            if (data) {
                // On ATTEND que MongoDB finisse d'enregistrer
                await Project.create(data);
                console.log(`✅ ${nomDuProjet} sauvegardé avec succès !`);
            }
        }

        console.log("🎉 Initialisation terminée ! Tu peux vérifier Atlas.");
        process.exit(); // On ferme le script proprement

    } catch (erreur) {
        console.error("❌ Une erreur globale est survenue :", erreur);
        process.exit(1);
    }
}

// On lance notre fonction
initialiserBaseDeDonnees();