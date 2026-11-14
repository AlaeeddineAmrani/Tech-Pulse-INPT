const axios = require('axios');
const Project = require('../models/Project.js');
const { fetchGithubData } = require('../services/githubService');
require('dotenv').config();

async function getProjects(req, res) {
    try {
        const projects = await Project.find({}, { history: 0 });
        res.status(200).json(projects);
    } catch (erreur) {
        console.error("Erreur lors du GET :", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

async function filterByTags(req, res) {
    try {
        const { domain, country } = req.query;
        let query = {};

        if (domain) {
            query.domainTags = domain;
        }
        if (country) {
            query.countryTags = country;
        }

        // Trouver les projets correspondant aux tags et trier par stars
        const projects = await Project.find(query).sort({ stargazers_count: -1 });
        res.status(200).json(projects);
    } catch (erreur) {
        console.error("Erreur lors du filtrage par tags :", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

async function getProfiles(req, res) {
    try {
        const nomComplet = decodeURIComponent(req.params.nomDuProjet);
        const urlGithub = `https://api.github.com/repos/${nomComplet}/contributors?per_page=100`;

        const resp = await axios.get(urlGithub, {
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const contributors = resp.data;
        const coordonneesFinales = [];

        for (const contributor of contributors) {
            const userResp = await axios.get(contributor.url, {
                headers: {
                    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            const user = userResp.data;

            if (user.location != null) {
                const loca = user.location;
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(loca)}`;

                await new Promise(resolve => setTimeout(resolve, 1000));

                const resp = await axios.get(url, {
                    headers: { 'User-Agent': 'TechPulse-INPT-App' }
                });

                const location = resp.data;
                if (location.length != 0) {
                    const lat = location[0].lat;
                    const lon = location[0].lon;

                    let countryName = loca;
                    if (location[0].display_name) {
                        const parts = location[0].display_name.split(',');
                        countryName = parts[parts.length - 1].trim();
                    }

                    const finalLocation = { lat, lon, country: countryName };
                    coordonneesFinales.push(finalLocation);
                }
            }

            if (coordonneesFinales.length == 20) {
                break;
            }
        }
        res.status(200).json(coordonneesFinales);

    } catch (err) {
        console.error("Erreur dans getProfiles :", err.message);
        res.status(400).json({ message: "Erreur lors du GET", details: err.message });
    }
}

async function getOneProject(req, res) {
    try {
        const nomComplet = decodeURIComponent(req.params.nomDuProjet);
        let projet = await Project.findOne({ full_name: nomComplet });

        if (!projet) {
            console.log(`🔍 [API] Projet non trouvé en base. Récupération depuis GitHub : ${nomComplet}`);
            const nouvellesDonnees = await fetchGithubData(nomComplet);

            if (nouvellesDonnees) {
                // Créer et enregistrer le projet dans MongoDB
                projet = new Project({
                    ...nouvellesDonnees,
                    history: [{
                        date: new Date(),
                        stars: nouvellesDonnees.stargazers_count
                    }]
                });
                await projet.save();
                console.log(`✅ [API] Projet ${nomComplet} récupéré et enregistré en base.`);
            } else {
                return res.status(404).json({ message: "Projet introuvable sur GitHub ni dans la base de données." });
            }
        }

        res.status(200).json(projet);
    } catch (erreur) {
        console.error("Erreur lors de la récupération du projet :", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

async function searchApi(req, res) {
    try {
        const motCle = req.params.motCle;
        const url = `https://api.github.com/search/repositories?q=${motCle}`;

        const resp = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const projectList = resp.data.items;

        const finalProjectsList = projectList.map(projet => ({
            full_name: projet.full_name,
            description: projet.description,
            language: projet.language,
            stargazers_count: projet.stargazers_count,
            forks_count: projet.forks_count,
            watchers_count: projet.watchers_count,
            open_issues_count: projet.open_issues_count,
            avatar_url: projet.owner?.avatar_url
        }));

        res.status(200).json(finalProjectsList);
    }
    catch (e) {
        console.error("Erreur lors du GET searchApi :", e);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

async function createProject(req, res) {
    try {
        const nouveauProjet = new Project(req.body);
        const projetSauvegarde = await nouveauProjet.save();
        res.status(201).json(projetSauvegarde);
    } catch (erreur) {
        console.error("Erreur lors du POST :", erreur);
        res.status(400).json({ message: "Erreur lors de la création", details: erreur.message });
    }
}

async function getTrendingProjects(req, res) {
    try {
        console.log("🔥 [API] Récupération des dépôts trending...");

        let trendingProjects = [];

        // 1. Tenter l'appel OSSInsight avec un timeout strict (2.5s)
        try {
            const hotResponse = await axios.get('https://api.ossinsight.io/v1/collections/hot/', {
                headers: { 'Accept': 'application/json' },
                timeout: 2500
            });

            if (hotResponse.data && hotResponse.data.data && Array.isArray(hotResponse.data.data.rows)) {
                const rows = hotResponse.data.data.rows;
                const uniqueRepoNames = [];
                for (const row of rows) {
                    if (row.repo_name && !uniqueRepoNames.includes(row.repo_name)) {
                        uniqueRepoNames.push(row.repo_name);
                    }
                    if (uniqueRepoNames.length >= 6) {
                        break;
                    }
                }

                console.log("👉 Dépôts trending sélectionnés via OSSInsight :", uniqueRepoNames);

                for (const repoName of uniqueRepoNames) {
                    let projet = await Project.findOne({ full_name: repoName });

                    if (!projet) {
                        const nouvellesDonnees = await fetchGithubData(repoName);
                        if (nouvellesDonnees) {
                            projet = new Project({
                                ...nouvellesDonnees,
                                history: [{
                                    date: new Date(),
                                    stars: nouvellesDonnees.stargazers_count
                                }]
                            });
                            await projet.save();
                        }
                    }

                    if (projet) {
                        trendingProjects.push(projet);
                    }
                }
            }
        } catch (ossErr) {
            console.warn("⚠️ [API-Trending] OSSInsight inaccessible (" + ossErr.message + ").");
        }

        // 2. Si OSSInsight a échoué ou n'a renvoyé aucun dépôt valide, fallback direct sur la base de données locale
        if (trendingProjects.length === 0) {
            console.log("⚠️ [API-Trending] Aucun dépôt via OSSInsight -> Recherche des dépôts les plus populaires dans MongoDB...");
            trendingProjects = await Project.find()
                .sort({ stargazers_count: -1 })
                .limit(6);
        }

        res.status(200).json(trendingProjects);
    } catch (err) {
        console.error("❌ Erreur lors de la récupération des dépôts trending :", err.message);

        try {
            console.log("⚠️ Fallback d'urgence sur les dépôts de la base locale...");
            const fallbackProjects = await Project.find()
                .sort({ stargazers_count: -1 })
                .limit(6);
            res.status(200).json(fallbackProjects);
        } catch (dbErr) {
            res.status(500).json({ message: "Erreur serveur", details: err.message });
        }
    }
}

async function getTrendingPaginated(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    try {
        console.log(`🔥 [API-TrendingPaginated] Récupération page=${page}, limit=${limit}...`);

        let trendingProjects = [];
        let totalCount = 0;
        let totalPages = 1;

        // 1. Tenter OSSInsight avec un timeout strict
        try {
            const hotResponse = await axios.get('https://api.ossinsight.io/v1/collections/hot/', {
                headers: { 'Accept': 'application/json' },
                timeout: 2500
            });

            if (
                hotResponse.data &&
                hotResponse.data.data &&
                Array.isArray(hotResponse.data.data.rows) &&
                hotResponse.data.data.rows.length > 0
            ) {
                const rows = hotResponse.data.data.rows;
                const uniqueRepoNames = [];
                for (const row of rows) {
                    if (row.repo_name && !uniqueRepoNames.includes(row.repo_name)) {
                        uniqueRepoNames.push(row.repo_name);
                    }
                }

                totalCount = uniqueRepoNames.length;
                totalPages = Math.ceil(totalCount / limit) || 1;
                const pageRepoNames = uniqueRepoNames.slice(startIndex, startIndex + limit);

                for (const repoName of pageRepoNames) {
                    let projet = await Project.findOne({ full_name: repoName });

                    if (!projet) {
                        await new Promise(resolve => setTimeout(resolve, 100));
                        const nouvellesDonnees = await fetchGithubData(repoName);
                        if (nouvellesDonnees) {
                            projet = new Project({
                                ...nouvellesDonnees,
                                history: [{
                                    date: new Date(),
                                    stars: nouvellesDonnees.stargazers_count
                                }]
                            });
                            await projet.save();
                        }
                    }

                    if (projet) {
                        trendingProjects.push(projet);
                    }
                }
            }
        } catch (ossErr) {
            console.warn("⚠️ [API-TrendingPaginated] OSSInsight inaccessible (" + ossErr.message + ").");
        }

        // 2. Si OSSInsight n'a pas fourni de dépôts, fallback direct sur MongoDB
        if (trendingProjects.length === 0) {
            console.log("⚠️ [API-TrendingPaginated] Fallback sur les dépôts de MongoDB...");
            totalCount = await Project.countDocuments();
            totalPages = Math.ceil(totalCount / limit) || 1;
            trendingProjects = await Project.find()
                .sort({ stargazers_count: -1 })
                .skip(startIndex)
                .limit(limit);
        }

        res.status(200).json({
            data: trendingProjects,
            page,
            totalPages,
            totalCount
        });
    } catch (err) {
        console.error("❌ Erreur lors de la récupération des dépôts trending paginés :", err.message);

        try {
            const fallbackProjects = await Project.find()
                .sort({ stargazers_count: -1 })
                .skip(startIndex)
                .limit(limit);
            const totalCount = await Project.countDocuments();
            const totalPages = Math.ceil(totalCount / limit) || 1;

            res.status(200).json({
                data: fallbackProjects,
                page,
                totalPages,
                totalCount
            });
        } catch (dbErr) {
            res.status(500).json({ message: "Erreur serveur", details: err.message });
        }
    }
}

module.exports = {
    getProjects,
    getOneProject,
    getProfiles,
    searchApi,
    createProject,
    getTrendingProjects,
    getTrendingPaginated,
    filterByTags
}