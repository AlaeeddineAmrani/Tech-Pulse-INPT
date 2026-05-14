import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import axios from 'axios';

export default function PageRecherche(){

    const [resultats, setResultats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [erreur, setErreur] = useState("");
    const {motCle} = useParams();

    

    useEffect(() => {

        const recupererDonnees = async () => {
        try {

            const reponse = await axios.get(`http://localhost:2500/api/projects/recherche/${motCle}`);

            setResultats(reponse.data);
            setIsLoading(false);
        } catch (err) {
            console.error("Erreur de connexion :", err);
            setErreur("Impossible de joindre le serveur Backend.");
            setIsLoading(false);
        }
        };

        recupererDonnees();
    }, [motCle]);

    return (
        <div>
            {isLoading && <p style={{ color: 'blue' }}>Analyse des serveurs GitHub en cours...</p>}

            {resultats.length === 0 && !isLoading && <p>Aucun résultat pour ce mot-clé</p>}

            <div className='allProjects'>
                {resultats.map(project => (
                    <ProjectCard key={project.full_name} projet={project} />
                ))}              
            </div>
        </div>
    )
}