import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './components/ProjectCard';
import { TrendingUp } from 'lucide-react';
import HeroSection from './components/HeroSection';
import CollectionsSection from './components/CollectionsSection';
import '../src/assets/styles/App.css'



function App() {

  const [projets, setProjets] = useState([]);
  const [erreur, setErreur] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const recupererDonnees = async () => {
      try {

        const reponse = await axios.get('http://localhost:2500/api/projects');


        setProjets(reponse.data);
      } catch (err) {
        console.error("Erreur de connexion :", err);
        setErreur("Impossible de joindre le serveur Backend.");
      }
    };

    recupererDonnees();
  }, []);

  function rediriger(projet) {

    const nomProjet = projet.full_name;
    let url = `/espace-visualisation/${encodeURIComponent(nomProjet)}`;
    navigate(url, { state: { projet } });
  }

  return (
    <div className='bigDiv'>
      <HeroSection />

      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

      <div id="trending-section">
        <h1 className='trending-title'>
          <TrendingUp className='trendingIcon' />
          Trending Repositories
        </h1>
        <p className='trending-subtitle'>Discover the most popular open-source projects gaining momentum right now</p>
      </div>
      {projets.length === 0 && !erreur && <p>Chargement des projets depuis MongoDB...</p>}
      <div className='allProjects'>
        {projets.map((projet) => (
          <ProjectCard key={projet.full_name} projet={projet} />
        ))}
      </div>
      <CollectionsSection />
    </div>
  );
}

export default App;