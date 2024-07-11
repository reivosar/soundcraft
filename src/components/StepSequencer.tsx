import React, { useState, useEffect } from "react";
import * as Tone from "tone";

const sounds = {
  Kick: new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 4,
    oscillator: { type: "sine" },
  }).toDestination(),
  Snare: new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.001, decay: 0.2, sustain: 0 },
  }).toDestination(),
  HiHat: new Tone.MetalSynth({
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
  }).toDestination(),
  Tom: new Tone.MembraneSynth({
    pitchDecay: 0.1,
    octaves: 2,
    oscillator: { type: "triangle" },
  }).toDestination(),
  Clap: new Tone.NoiseSynth({
    noise: { type: "pink" },
    envelope: { attack: 0.001, decay: 0.15, sustain: 0 },
  }).toDestination(),
  Cymbal: new Tone.MetalSynth({
    harmonicity: 5.1,
    modulationIndex: 64,
    resonance: 4000,
    envelope: { attack: 0.001, decay: 1.4, release: 0.2 },
  }).toDestination(),
};

const StepSequencer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [currentStep, setCurrentStep] = useState(0);
  const [sequence, setSequence] = useState(
    Object.keys(sounds).map(() => Array(16).fill(false))
  );

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const toggleStep = (row: number, col: number) => {
    const newSequence = sequence.map((r, rowIndex) =>
      rowIndex === row
        ? r.map((step, colIndex) => (colIndex === col ? !step : step))
        : r
    );
    setSequence(newSequence);
  };

  const clearSequence = () => {
    setSequence(Object.keys(sounds).map(() => Array(16).fill(false)));
  };

  useEffect(() => {
    const part = new Tone.Sequence(
      (time, col) => {
        setCurrentStep(col);
        sequence.forEach((row, rowIndex) => {
          if (row[col]) {
            const sound = Object.values(sounds)[rowIndex];
            if (sound instanceof Tone.NoiseSynth) {
              sound.triggerAttackRelease("16n", time);
            } else {
              sound.triggerAttackRelease("C2", "16n", time);
            }
          }
        });
      },
      Array.from({ length: 16 }, (_, col) => col),
      "16n"
    );

    if (isPlaying) {
      part.start(0);
      Tone.Transport.start();
    } else {
      part.stop();
      Tone.Transport.stop();
    }

    return () => {
      part.dispose();
    };
  }, [isPlaying, sequence]);

  return (
    <div className="p-4 bg-gray-900 text-white w-full max-w-3xl mx-auto rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-green-500 rounded-lg shadow-md hover:bg-green-400"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? "Stop" : "Play"}
        </button>
        <div className="flex items-center space-x-2">
          <label>Tempo:</label>
          <input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-16 p-2 bg-gray-700 rounded-lg"
          />
        </div>
        <button
          className="px-4 py-2 bg-red-500 rounded-lg shadow-md hover:bg-red-400"
          onClick={clearSequence}
        >
          Clear
        </button>
      </div>
      <div className="grid grid-rows-6 gap-2">
        {sequence.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-2 items-center">
            <label className="w-16 text-center">
              {Object.keys(sounds)[rowIndex]}
            </label>
            {row.map((step, colIndex) => (
              <button
                key={colIndex}
                className={`w-8 h-8 rounded-md transition-colors duration-200 ${
                  currentStep === colIndex
                    ? "border border-yellow-500"
                    : step
                    ? "bg-blue-500 hover:bg-blue-400"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => toggleStep(rowIndex, colIndex)}
              ></button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepSequencer;
