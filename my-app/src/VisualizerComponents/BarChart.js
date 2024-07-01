import React, { useRef, useEffect } from 'react'; // Import React hooks
import * as d3 from 'd3'; // Import D3.js

const BarChart = ({ data }) => {
  const ref = useRef(); // Create a ref to attach to the SVG element

  useEffect(() => {
    const svg = d3.select(ref.current); // Select the SVG element
    const margin = {right: 10, left: 10 }; // Set margins
    
    
    
    const width = (document.getElementById('Bar').getBoundingClientRect().width) - margin.left - margin.right;
    const height = (document.getElementById('Bar').getBoundingClientRect().height) - margin.left - margin.right;
    console.log(width, height)
    //console.log(document.getElementById('Visualizer').getBoundingClientRect(), document.getElementById('Visualizer').getBoundingClientRect().width)

    svg.selectAll('*').remove(); // Clear previous contents of the SVG

    const g = svg.append('g')

    const x = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .nice()
      .range([height, 0]);

    // g.append('g')
    //   .attr('class', 'x-axis')
    //   .attr('transform', `translate(0,${height})`)
    //   .call(d3.axisBottom(x).tickFormat(i => i));

    // g.append('g')
    //   .attr('class', 'y-axis')
    //   .call(d3.axisLeft(y).ticks(5));

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d))
      .attr('fill', 'yellow');

  }, [data, ref.current]); // Re-run the effect if data changes

  // Make it dyanmically change in size.
  return (
    <div id = "Visualizer" class="size-full flex justify-center items-center">
      <svg id = "Bar" ref={ref} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default BarChart;