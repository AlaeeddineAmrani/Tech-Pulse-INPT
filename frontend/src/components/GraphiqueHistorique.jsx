import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import '../assets/styles/graphiquehistorique.css';

export default function GraphiqueHistorique({ history = [] }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Convert raw history to D3-friendly format
    const donnees = history.map(h => ({
      date: new Date(h.date),
      stars: h.stars
    }));

    // Nothing to draw if less than 2 points
    if (donnees.length < 2) return;

    const largeur = 700;
    const hauteur = 350;
    const marges = { haut: 40, droite: 30, bas: 40, gauche: 60 };
    const largeurInterne = largeur - marges.gauche - marges.droite;
    const hauteurInterne = hauteur - marges.haut - marges.bas;

    const g = svg.append("g")
      .attr("transform", `translate(${marges.gauche},${marges.haut})`);

    // --- Scales ---
    const echelleX = d3.scaleTime()
      .domain(d3.extent(donnees, d => d.date))
      .range([0, largeurInterne]);

    const echelleY = d3.scaleLinear()
      .domain([d3.min(donnees, d => d.stars) * 0.95, d3.max(donnees, d => d.stars) * 1.05])
      .range([hauteurInterne, 0]);

    // --- Axes ---
    g.append("g")
      .attr("transform", `translate(0,${hauteurInterne})`)
      .call(d3.axisBottom(echelleX).ticks(5))
      .attr("color", "#64748b");

    g.append("g")
      .call(d3.axisLeft(echelleY).ticks(5).tickFormat(d => d >= 1000 ? d / 1000 + "k" : d))
      .attr("color", "#fbbf24")
      .style("font-weight", "bold")
      .call(g => g.select(".domain").remove());

    // --- Gradient fill under the curve ---
    const gradient = svg.append("defs").append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "0%").attr("y2", "100%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#fbbf24").attr("stop-opacity", 0.3);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#fbbf24").attr("stop-opacity", 0);

    // --- Area (filled region under the line) ---
    const area = d3.area()
      .x(d => echelleX(d.date))
      .y0(hauteurInterne)
      .y1(d => echelleY(d.stars))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(donnees)
      .attr("fill", "url(#area-gradient)")
      .attr("d", area);

    // --- Line ---
    const ligne = d3.line()
      .x(d => echelleX(d.date))
      .y(d => echelleY(d.stars))
      .curve(d3.curveMonotoneX);

    const chemin = g.append("path")
      .datum(donnees)
      .attr("fill", "none")
      .attr("stroke", "#fbbf24")
      .attr("stroke-width", 3)
      .attr("d", ligne);

    // Animate the line drawing
    const longueur = chemin.node().getTotalLength();
    chemin
      .attr("stroke-dasharray", `${longueur} ${longueur}`)
      .attr("stroke-dashoffset", longueur)
      .transition().duration(2000).ease(d3.easeCubicOut)
      .attr("stroke-dashoffset", 0);

    // --- Dots on each data point ---
    g.selectAll(".dot")
      .data(donnees)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => echelleX(d.date))
      .attr("cy", d => echelleY(d.stars))
      .attr("r", 4)
      .attr("fill", "#fbbf24")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("opacity", 0)
      .transition().delay(2000).duration(400)
      .style("opacity", 1);

  }, [history]);

  // Show a message when there's no history data
  if (!history || history.length < 2) {
    return (
      <div className='graph-hist'>
        <h3 className='graph-title'>⭐ Stars History</h3>
        <p className='graph-empty'>No history data available yet.</p>
      </div>
    );
  }

  return (
    <div className='graph-hist'>
      <h3 className='graph-title'>⭐ Stars History</h3>
      <svg ref={svgRef} viewBox="0 0 700 350" style={{ width: '100%', maxWidth: '700px', height: 'auto' }} />
    </div>
  );
}