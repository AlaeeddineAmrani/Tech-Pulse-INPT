import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitFork, Star, Languages, ExternalLink} from 'lucide-react';
import '../assets/styles/visuacard.css';

export default function VisuaCard({ projet }) {

  const [erreur, setErreur] = useState(null);



  return (
    <>      
        <div className="visua-project" onClick={()=>{ rediriger(projet) }}>
            <div className='div3'>
                <img src={projet.avatar_url} alt={projet.name} style={{ width: '100px', height: '100px' }} />
                <h2 className='full-name'>{projet.full_name}</h2>
                <a className='card-link' href={projet.html_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                </a>
            </div>
            <ul className='desc'>{projet.description}</ul>
            <div className='div4'>
                <ul className='card-star'><Star /> {projet.stargazers_count}</ul>
                <ul className='card-fork'><GitFork /> {projet.forks_count}</ul>
                <ul className='card-lang'><Languages /> {projet.language}</ul>
            </div>
        </div>
    </>
    );
}