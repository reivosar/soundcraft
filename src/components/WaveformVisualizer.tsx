import React, { useEffect, useRef } from "react";
import * as Tone from "tone";

type WaveformVisualizerProps = {
  analyser: Tone.Analyser;
};

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  analyser,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = () => {
      requestAnimationFrame(draw);

      const values = analyser.getValue();
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.beginPath();
      context.moveTo(0, canvas.height / 2);
      for (let i = 0; i < values.length; i++) {
        const x = (i / values.length) * canvas.width;
        const y = ((values[i] as number) / 2 + 0.5) * canvas.height;
        context.lineTo(x, y);
      }
      context.strokeStyle = "white";
      context.lineWidth = 2;
      context.stroke();
    };

    draw();
  }, [analyser]);

  return (
    <canvas
      ref={canvasRef}
      width="880"
      height="200"
      className=" bg-gray-800 rounded-lg"
    ></canvas>
  );
};

export default WaveformVisualizer;
