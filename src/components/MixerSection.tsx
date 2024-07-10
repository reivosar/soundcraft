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

type NoiseSettings = {
  type: string;
  volume: number;
};

type MixerSectionProps = {
  oscillators: SynthSettings[];
  noise: NoiseSettings;
  setOscillators: React.Dispatch<React.SetStateAction<SynthSettings[]>>;
  setNoise: React.Dispatch<React.SetStateAction<NoiseSettings>>;
};

const MixerSection: React.FC<MixerSectionProps> = ({
  oscillators,
  noise,
  setOscillators,
  setNoise,
}) => {
  const updateOscillatorVolume = (index: number, value: number) => {
    const newOscillators = [...oscillators];
    newOscillators[index].volume = value;
    setOscillators(newOscillators);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4 flex flex-row items-center w-3/4 justify-evenly">
      {oscillators.map((osc, index) => (
        <div key={index} className="mb-4 flex flex-col items-center">
          <h4 className="text-lg mb-2">Oscillator {index + 1}</h4>
          <Knob
            label="Volume"
            min={0}
            max={100}
            step={1}
            value={osc.volume}
            onChange={(value) => updateOscillatorVolume(index, value)}
          />
        </div>
      ))}
      <div className="mb-4 flex flex-col items-center">
        <h4 className="text-lg mb-2">Noise Generator</h4>
        <Knob
          label="Volume"
          min={0}
          max={100}
          step={1}
          value={noise.volume}
          onChange={(value) => setNoise({ ...noise, volume: value })}
        />
      </div>
    </div>
  );
};

export default MixerSection;
