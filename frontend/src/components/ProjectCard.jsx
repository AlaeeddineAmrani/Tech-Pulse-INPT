import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitFork, Star, Languages, ExternalLink} from 'lucide-react';
import '../assets/styles/projectcard.css';

export default function ProjectCard({ projet }) {

  const [projets, setProjets] = useState([]);
  const [erreur, setErreur] = useState(null);

  const navigate = useNavigate();

  function rediriger(projet){
    const nomProjet = projet.full_name;
    let url = `/espace-visualisation/${encodeURIComponent(nomProjet)}`;
    navigate(url, { state: {projet} })
  }

  return (
    <>      
        <div className="project-card" onClick={()=>{ rediriger(projet) }}>
            <div className='div1'>
                <img src={projet.avatar_url} alt={projet.name} style={{ width: '50px', height: '50px' }} />
                <h2 className='full-name'>{projet.full_name}</h2>
                <a className='card-link' href={projet.html_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                </a>
            </div>
            <ul className='card-desc'>{projet.description}</ul>
            <div className='div2'>
                <ul className='card-star'><Star /> {projet.stargazers_count}</ul>
                <ul className='card-fork'><GitFork /> {projet.forks_count}</ul>
                <ul className='card-lang'><Languages /> {projet.language}</ul>
            </div>
        </div>
    </>
    );
}