import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VisuaCard from '../components/VisuaCard';
import GraphiqueHistorique from '../components/GraphiqueHistorique';
import GlobeGraph from '../components/GlobeGraph';
import '../assets/styles/visualisation.css';
import RadarSanteProjet from '../components/RadarSanteProjet';


function Visualisation() {

    const navigate = useNavigate();
    const { projet } = useLocation().state;

    function retourner() {
        navigate(-1);
    }

    return (
        <div className="visu-page">
            <h1 className='visu-title'>Advanced Visualisation</h1>

            <button className='back-btn' onClick={() => retourner()}>← Back</button>
            <div>
                <VisuaCard projet={projet} />
            </div>
            <div className="dashboard-row">
                <div className="chart-container">
                    <GraphiqueHistorique history={projet.history} />
                </div>
                <GlobeGraph fullName={projet.full_name} />
            </div>
            <div className='radar-sante-projet'>
                <RadarSanteProjet projet={projet} />
            </div>
        </div>
    );
}

export default Visualisation;