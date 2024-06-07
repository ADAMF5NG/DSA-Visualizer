// ExampleComponent.js
import React, { useEffect, useRef } from 'react';
import './VisualizerComponent.css'
import { Array2DTracer, Layout, LogTracer, Tracer, VerticalLayout } from 'algorithm-visualizer';

const VisualizerComponent = () => {
  const array2dTracerRef = useRef(null);
  const logTracerRef = useRef(null);

  useEffect(() => {
    const messages = [
      'Visualize',
      'your',
      'own',
      'code',
      'here!',
    ];

    const array2dTracer = new Array2DTracer('Grid');
    const logTracer = new LogTracer('Console');

    const highlight = (line) => {
      if (line >= messages.length) return;
      const message = messages[line];
      logTracer.println(message);
      array2dTracer.selectRow(line, 0, message.length - 1);
      Tracer.delay();
      array2dTracer.deselectRow(line, 0, message.length - 1);
      highlight(line + 1);
    };

    Layout.setRoot(new VerticalLayout([array2dTracer, logTracer]));
    array2dTracer.set(messages);
    Tracer.delay();
    highlight(0);

    // Attach tracers to refs if needed
    array2dTracerRef.current = array2dTracer;
    logTracerRef.current = logTracer;
  }, []);

  return (
    <div>
      <h1>Algorithm Visualizer</h1>
      <div id="visualizer-container"></div>
    </div>
  );
};

export default VisualizerComponent;