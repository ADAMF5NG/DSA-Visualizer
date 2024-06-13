// ExampleComponent.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

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

const BarChart = ({data}) => {
  const ref = useRef();
  
  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr('width', 600)
      .attr('height', 400)
      .style('background', '#f0f0f0')
      .style('margin-top', '50')
      .style('overflow', 'visible');

    const xScale = d3.scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 600])
      .padding(0.5);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([400, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append('g')
      .call(xAxis)
      .attr('transform', 'translate(0, 400)');

    svg.append('g')
      .call(yAxis);

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (value, index) => xScale(index))
      .attr('y', yScale)
      .attr('width', xScale.bandwidth())
      .attr('height', value => 400 - yScale(value))
      .attr('fill', 'steelblue');

  }, [data]);

  return (
    <svg ref = {ref}></svg>
  );
};

export default BarChart;
