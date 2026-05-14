import axios from 'axios';
//import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import GraphiqueHistorique from '../components/GraphiqueHistorique';
import Globe from 'react-globe.gl';
import '../assets/styles/visualisation.css';




function Visualisation() {

    const [coordonnees, setCoordonnees] = useState([]);
    const [globeLoading, setGlobeLoading] = useState(true);
    
    const svgRef = useRef();
    const navigate = useNavigate();

    const { projet } = useLocation().state;

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const reponse = await axios.get(`http://localhost:2500/api/projects/${encodeURIComponent(projet.full_name)}/locations`); 
                console.log("Données reçues du backend :", reponse.data);
                const coordonneesFormatees = reponse.data.map(loc => ({
                    lat: parseFloat(loc.lat),
                    lng: parseFloat(loc.lon) 
                }));

                setCoordonnees(coordonneesFormatees);
                setGlobeLoading(false);
            } catch (erreur) {
                console.error("Erreur de récupération des localisations", erreur);
                setGlobeLoading(false);
            }
        };

        fetchLocations();
    }, [projet.full_name]);

    function retourner() {
        navigate(-1);
    }

    const fakeHistory = [
        { date: '2026-04-10', stars: 100 },
        { date: '2026-04-11', stars: 150 },
        { date: '2026-04-12', stars: 180 },
        { date: '2026-04-13', stars: 250 },
    ];

    return (
        <div style={{padding:"20px"}} >
            <h1>Advanced Visualisation</h1>
            
            
            

            <div className="dashboard-row">
                <div className="chart-container">
                    <GraphiqueHistorique />
                </div>
                <div className="globe-container">
                    <h3>Localisation des Contributeurs</h3>
                    
                    {globeLoading ? (
                        <p style={{ color: '#3b82f6' }}>Analyse satellitaire en cours...</p>
                    ) : (
                        <Globe
                            width={400}
                            height={400}
                            backgroundColor="rgba(0,0,0,0)" // Transparent pour ton mode sombre
                            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                            
                            ringsData={coordonnees}
                            
                            ringColor={() => '#3b82f6'} // Le même bleu que les Forks
                            ringMaxRadius={8} // Taille maximale de l'onde
                            ringPropagationSpeed={3} // Vitesse de l'onde
                            ringRepeatPeriod={800} // L'onde se répète toutes les 0.8 secondes
                        />
                    )}
                </div>
            </div>
            <ProjectCard projet={projet} /><br />
        </div>
    );
}

export default Visualisation;

/*
    <XAxis dataKey="date"></XAxis>
    <YAxis></YAxis>            
    <Tooltip></Tooltip>
    <Line dataKey="stars" stroke="#00056d"></Line>
</LineChart>
            */