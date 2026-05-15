import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Globe from 'react-globe.gl';
import '../assets/styles/globegraph.css';

export default function GlobeGraph({ fullName }) {
    const [coordonnees, setCoordonnees] = useState([]);
    const [globeLoading, setGlobeLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const reponse = await axios.get(
                    `http://localhost:2500/api/projects/${encodeURIComponent(fullName)}/locations`
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
        <div className="globe-card">
            <h3 className="globe-card-title">Localisation des Contributeurs</h3>

            {globeLoading ? (
                <div className="globe-loading">
                    <div className="globe-spinner"></div>
                    <p>Analyse satellitaire en cours...</p>
                </div>
            ) : (
                <Globe
                    width={400}
                    height={400}
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
