import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Globe from 'react-globe.gl';
import '../assets/styles/globegraph.css';

export default function GlobeGraph({ fullName }) {
    const [coordonnees, setCoordonnees] = useState([]);
    const [globeLoading, setGlobeLoading] = useState(true);
    const [globeSize, setGlobeSize] = useState(400);
    const containerRef = useRef(null);

    // Measure container width and resize globe accordingly
    useEffect(() => {
        function handleResize() {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth - 48; // account for padding
                setGlobeSize(Math.min(400, Math.max(200, width)));
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                
                const apiUrl = import.meta.env.DEV 
                    ? 'http://localhost:2500' 
                    : '/_/backend';
                const reponse = await axios.get(
                    `${apiUrl}/api/projects/${encodeURIComponent(fullName)}/locations`
                );
                //console.log("Données reçues du backend :", reponse.data);
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
    }, [fullName]);

    return (
        <div className="globe-card" ref={containerRef}>
            <h3 className="globe-card-title">Localisation des Contributeurs</h3>

            {globeLoading ? (
                <div className="globe-loading">
                    <div className="globe-spinner"></div>
                    <p>Analyse satellitaire en cours...</p>
                </div>
            ) : (
                <Globe
                    width={globeSize}
                    height={globeSize}
                    backgroundColor="rgba(0,0,0,0)"
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                    ringsData={coordonnees}
                    ringColor={() => '#818cf8'}
                    ringMaxRadius={8}
                    ringPropagationSpeed={3}
                    ringRepeatPeriod={800}
                />
            )}
        </div>
    );
}
