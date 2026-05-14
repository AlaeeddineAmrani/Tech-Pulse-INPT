import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageHeader from './components/PageHeader';
import ProjectCard from './components/ProjectCard';
import { TextAlignCenter, TrendingUp } from 'lucide-react';
import PageFooter from './components/PageFooter';
import HeroSection from './components/HeroSection';
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

      {projets.length === 0 && !erreur && <p>Chargement des projets depuis MongoDB...</p>}

      <h1 className='trending-title'>
        <TrendingUp className='trendingIcon' />
        Trending Repositories
      </h1>
      
      <div className='allProjects'>
        {projets.map((projet) => (
          <ProjectCard key={projet.full_name} projet={projet} />
        ))}
      </div>
      
    </div>
  );
}

export default App;