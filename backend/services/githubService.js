// On importe la librairie axios (installée précédemment avec npm)
const axios = require('axios');

async function fetchGithubData(name) {
    try {
        // L'URL dynamique (ex: si name = "torvalds/linux")
        const url = `https://api.github.com/repos/${name}`;

        // L'équivalent de ton fetch, mais avec axios
        const resp = await axios.get(url, {
            headers: {
                // C'EST ICI LA MAGIE : On passe ton Token caché dans le .env
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json' // Bonne pratique demandée par GitHub
            }
        });
        
        // Avec axios, les données JSON sont DIRECTEMENT dans "resp.data"
        const data = resp.data;

        // Au lieu de modifier du HTML (on est dans le backend maintenant !), 
        // on prépare un bel objet propre avec juste ce qui nous intéresse pour notre Base de Données
        const objetProjet = {
            full_name: data.full_name,
            description: data.description,
            language: data.language,
            stargazers_count: data.stargazers_count,
            forks_count: data.forks_count,
            avatar_url: data.owner.avatar_url
        };

        // On renvoie cet objet pour que le Controller puisse l'utiliser et le sauvegarder
        return objetProjet;

    } catch (e) {
        // Axios nous donne des détails précis sur l'erreur
        console.error(`❌ Erreur lors de la récupération de ${name} :`, e.response ? e.response.data.message : e.message);
        // On renvoie null pour dire "ce projet a échoué"
        return null; 
    }
}

// On exporte la fonction pour l'utiliser dans notre script de remplissage
module.exports = {
    fetchGithubData
};