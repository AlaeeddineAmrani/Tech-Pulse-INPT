const Project = require('../backend/models/Project.js');

async function getProjects(req, res){
    try{
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (erreur) {
        // En cas de problème avec la base de données
        console.error("Erreur lors du GET :", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

// Récupérer UN SEUL projet (ex: quand le frontend clique sur la carte de React)
async function getOneProject(req, res) { 
    // On va chercher dans la base le projet dont le nom correspond à ce qu'on a demandé
    const projet = await Project.findOne({ full_name: req.params.nomDuProjet });
    res.json(projet);
}


module.exports = {
    getProjects,
    getOneProject
}