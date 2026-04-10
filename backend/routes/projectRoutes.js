const express = require('express');
const router = express.Router();

// 1. On importe le fameux controller que tu viens de corriger
const projectController = require('../controllers/ProjectController');

// 2. On crée la route principale. 
// Note bien : on passe juste le nom de la fonction, on ne met pas les parenthèses () !
// Express va automatiquement donner 'req' et 'res' à cette fonction en coulisses.
router.get('/', projectController.getProjects);
// Si on va sur /api/projects/facebook/react -> Donne juste React
router.get('/:nomDuProjet', projectController.getOneProject);

// 3. On ajoute la route POST pour envoyer des données !
router.post('/', projectController.createProject);

// 4. On exporte le routeur
module.exports = router;