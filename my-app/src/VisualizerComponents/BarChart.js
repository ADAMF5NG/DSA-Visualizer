
// export default class VisualizerComponent extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       array: [],
//     };
//   }

//   componentDidMount(){
//     this.resetArray();
//   }

//   resetArray(){
//     const array = [];
//     for(let i = 0; i < 100; i++){
//       array.push(randomInt(5, 100));
//     }
//     this.setState({array});
//   }

//   render() {
//     const { array } = this.state;
  
//     return (
//       array.map((value, idx) => (
//         <div className="array-bar" key={idx}>{value}</div>
//       ))
//     );
//   }
// }

// function randomInt(min, max){
//     return Math.floor(Math.random() * (max-min+1) + min);
// }

import React, { useRef, useEffect } from 'react'; // Import React hooks
import * as d3 from 'd3'; // Import D3.js

const BarChart = ({ data }) => {
  const ref = useRef(); // Create a ref to attach to the SVG element

  useEffect(() => {
    const svg = d3.select(ref.current); // Select the SVG element
    const margin = { top: 200, right: 300, bottom: 400, left: 400 };
    const width = parseInt(d3.select(ref.current).style('width')) - margin.left - margin.right;
    const height = parseInt(d3.select(ref.current).style('height')) - margin.top - margin.bottom;

    svg.selectAll('*').remove(); // Clear previous contents of the SVG

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .nice()
      .range([height, 0]);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(i => i));

    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y).ticks(5));

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d))
      .attr('fill', 'steelblue');

  }, [data, ref.current]); // Re-run the effect if data changes

  return (
    <div style={{ width: '100%', height: '1000px' }}>
      <svg ref={ref} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default BarChart;