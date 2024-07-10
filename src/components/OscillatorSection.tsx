import React from "react";
import { Knob } from "./Knob";
import * as Tone from "tone";

type SynthSettings = {
  oscillatorType: Tone.ToneOscillatorType;
  filterFrequency: number;
  filterQ: number;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  volume: number;
  isActive: boolean;
};

type OscillatorSectionProps = {
  index: number;
  osc: SynthSettings;
  setOscillators: React.Dispatch<React.SetStateAction<SynthSettings[]>>;
};

const OscillatorSection: React.FC<OscillatorSectionProps> = ({
  index,
  osc,
  setOscillators,
}) => {
  const updateOscillator = (
    param: keyof SynthSettings,
    value: string | number
  ) => {
    setOscillators((prevOscillators) => {
      const newOscillators = [...prevOscillators];
      newOscillators[index] = { ...newOscillators[index], [param]: value };
      return newOscillators;
    });
  };

  const waveforms = [
    {
      type: "sine",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current text-white"
        >
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
        </svg>
      ),
    },
    {
      type: "square",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current text-white"
        >
          <path d="M3 3h18v18H3z" />
        </svg>
      ),
    },
    {
      type: "triangle",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current text-white"
        >
          <path d="M12 2l10 18H2z" />
        </svg>
      ),
    },
    {
      type: "sawtooth",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current text-white"
        >
          <path d="M2 22V2l20 20H2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4 flex flex-col items-center border border-gray-600">
      <h3 className="text-xl mb-4">Oscillator {index + 1}</h3>
      <div className="flex mb-4 justify-center w-full">
        {waveforms.map(({ type, icon }) => (
          <label key={type} className="text-white flex-1 text-center mx-2">
            <input
              type="radio"
              name={`oscillatorType-${index}`}
              value={type}
              checked={osc.oscillatorType === type}
              onChange={(e) =>
                updateOscillator("oscillatorType", e.target.value)
              }
              className="mr-1"
            />
            <div className="flex flex-col items-center">
              {icon}
              <span className="mt-2">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </div>
          </label>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Knob
          label="Filter Freq"
          min={20}
          max={20000}
          step={1}
          value={osc.filterFrequency}
          onChange={(value) => updateOscillator("filterFrequency", value)}
        />
        <Knob
          label="Filter Q"
          min={0.1}
          max={10}
          step={0.1}
          value={osc.filterQ}
          onChange={(value) => updateOscillator("filterQ", value)}
        />
        <Knob
          label="Attack"
          min={0}
          max={1}
          step={0.01}
          value={osc.attack}
          onChange={(value) => updateOscillator("attack", value)}
        />
        <Knob
          label="Decay"
          min={0}
          max={1}
          step={0.01}
          value={osc.decay}
          onChange={(value) => updateOscillator("decay", value)}
        />
        <Knob
          label="Sustain"
          min={0}
          max={1}
          step={0.01}
          value={osc.sustain}
          onChange={(value) => updateOscillator("sustain", value)}
        />
        <Knob
          label="Release"
          min={0}
          max={5}
          step={0.1}
          value={osc.release}
          onChange={(value) => updateOscillator("release", value)}
        />
      </div>
    </div>
  );
};

export default OscillatorSection;
