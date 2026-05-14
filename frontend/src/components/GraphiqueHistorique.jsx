import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import '../assets/styles/graphiquehistorique.css'
// 1. Données de test (Maintenant avec les forks)
const donneesTest = [
  { date: new Date('2026-01-01'), etoiles: 120000, forks: 15000 },
  { date: new Date('2026-02-01'), etoiles: 125000, forks: 16500 },
  { date: new Date('2026-03-01'), etoiles: 132000, forks: 18000 },
  { date: new Date('2026-04-01'), etoiles: 145000, forks: 21000 },
  { date: new Date('2026-05-01'), etoiles: 152000, forks: 22500 },
  { date: new Date('2026-06-01'), etoiles: 158000, forks: 24000 }
];

export default function GraphiqueHistorique({ donnees = donneesTest }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const largeur = 700;
    const hauteur = 350;
    // On agrandit la marge droite pour faire de la place au 2ème axe
    const marges = { haut: 40, droite: 60, bas: 40, gauche: 60 };
    const largeurInterne = largeur - marges.gauche - marges.droite;
    const hauteurInterne = hauteur - marges.haut - marges.bas;

    const g = svg.append("g")
      .attr("transform", `translate(${marges.gauche},${marges.haut})`);

    // --- LES ÉCHELLES ---
    const echelleX = d3.scaleTime()
      .domain(d3.extent(donnees, d => d.date))
      .range([0, largeurInterne]);

    // Échelle Y pour les Étoiles (Gauche)
    const echelleYEtoiles = d3.scaleLinear()
      .domain([d3.min(donnees, d => d.etoiles) * 0.95, d3.max(donnees, d => d.etoiles) * 1.05])
      .range([hauteurInterne, 0]);

    // Échelle Y pour les Forks (Droite)
    const echelleYForks = d3.scaleLinear()
      .domain([d3.min(donnees, d => d.forks) * 0.95, d3.max(donnees, d => d.forks) * 1.05])
      .range([hauteurInterne, 0]);

    // --- DESSIN DES AXES ---
    // Axe X (Temps)
    g.append("g")
      .attr("transform", `translate(0,${hauteurInterne})`)
      .call(d3.axisBottom(echelleX).ticks(5))
      .attr("color", "#64748b");

    // Axe Y Gauche (Étoiles - Jaune)
    g.append("g")
      .call(d3.axisLeft(echelleYEtoiles).ticks(5).tickFormat(d => d / 1000 + "k"))
      .attr("color", "#eab308") // Jaune
      .style("font-weight", "bold")
      .call(g => g.select(".domain").remove());

    // Axe Y Droit (Forks - Bleu)
    g.append("g")
      .attr("transform", `translate(${largeurInterne},0)`) // On le pousse à droite
      .call(d3.axisRight(echelleYForks).ticks(5).tickFormat(d => d / 1000 + "k"))
      .attr("color", "#3b82f6") // Bleu
      .style("font-weight", "bold")
      .call(g => g.select(".domain").remove());

    // --- LES LIGNES ---
    const ligneEtoiles = d3.line()
      .x(d => echelleX(d.date))
      .y(d => echelleYEtoiles(d.etoiles))
      .curve(d3.curveMonotoneX);

    const ligneForks = d3.line()
      .x(d => echelleX(d.date))
      .y(d => echelleYForks(d.forks))
      .curve(d3.curveMonotoneX);

    // Fonction d'animation réutilisable
    const animerLigne = (chemin) => {
      const longueur = chemin.node().getTotalLength();
      chemin.attr("stroke-dasharray", `${longueur} ${longueur}`)
        .attr("stroke-dashoffset", longueur)
        .transition().duration(2000).ease(d3.easeCubicOut)
        .attr("stroke-dashoffset", 0);
    };

    // Dessin et Animation - Courbe Étoiles (Jaune)
    const cheminEtoiles = g.append("path")
      .datum(donnees).attr("fill", "none").attr("stroke", "#eab308").attr("stroke-width", 3)
      .attr("d", ligneEtoiles);
    animerLigne(cheminEtoiles);

    // Dessin et Animation - Courbe Forks (Bleu)
    const cheminForks = g.append("path")
      .datum(donnees).attr("fill", "none").attr("stroke", "#3b82f6").attr("stroke-width", 3)
      .attr("d", ligneForks);
    animerLigne(cheminForks);

  }, [donnees]);

  return (
    <div className='graph-hist'>
      <h3 className='graph-title'>
        Évolution : <span style={{color: '#eab308'}}>Étoiles</span> vs <span style={{color: '#3b82f6'}}>Forks</span>
      </h3>
      <svg ref={svgRef} viewBox={`0 0 700 350`} style={{ width: '100%', maxWidth: '700px', height: 'auto' }} />
    </div>
  );
}