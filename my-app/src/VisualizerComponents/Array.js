import * as d3 from 'd3'; // Import D3.js
import React, { useRef, useEffect } from 'react';

const Array = ({ data }) => {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        const margin = {right: 10, left: 10 }; // Set margins
    
    
    
        const width = (document.getElementById('Bar').getBoundingClientRect().width) - margin.left - margin.right;
        const height = (document.getElementById('Bar').getBoundingClientRect().height) - margin.left - margin.right;

        svg.selectAll('*').remove();

    

    }, [data, ref.current]);

    
    return (
        <div id = "Visualizer" class="size-full flex justify-center items-center">
            <svg ref={ref} style={{ width: '50%', height: '50%' }} />
        </div>
    );
}

export default Array