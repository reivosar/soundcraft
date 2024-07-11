import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import OscillatorSection from "./OscillatorSection";
import NoiseGenerator from "./NoiseGenerator";
import MixerSection from "./MixerSection";
import WaveformVisualizer from "./WaveformVisualizer";

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

const SynthScreen: React.FC = () => {
  const [oscillators, setOscillators] = useState<SynthSettings[]>([
    {
      oscillatorType: "sawtooth",
      filterFrequency: 800,
      filterQ: 1,
      attack: 0.1,
      decay: 0.2,
      sustain: 0.8,
      release: 1.2,
      volume: 50,
      isActive: true,
    },
    {
      oscillatorType: "sawtooth",
      filterFrequency: 800,
      filterQ: 1,
      attack: 0.1,
      decay: 0.2,
      sustain: 0.8,
      release: 1.2,
      volume: 50,
      isActive: true,
    },
    {
      oscillatorType: "sawtooth",
      filterFrequency: 800,
      filterQ: 1,
      attack: 0.1,
      decay: 0.2,
      sustain: 0.8,
      release: 1.2,
      volume: 50,
      isActive: true,
    },
  ]);
  const [isLooping, setIsLooping] = useState(false);
  const analyserRef = useRef<Tone.Analyser>(
    new Tone.Analyser("waveform", 1024)
  );
  const loopRef = useRef<Tone.Loop | null>(null);

  const [noise, setNoise] = useState({ type: "white", volume: 50 });

  const synthRefs = useRef<Tone.MonoSynth[]>([]);
  const noiseSynthRef = useRef<Tone.Noise | null>(null);
  const noiseEnvRef = useRef<Tone.AmplitudeEnvelope | null>(null);

  useEffect(() => {
    synthRefs.current = oscillators.map((osc) => {
      const monoSynth = new Tone.MonoSynth({
        oscillator: { type: osc.oscillatorType as Tone.ToneOscillatorType },
        filter: {
          type: "lowpass",
          frequency: osc.filterFrequency,
          rolloff: -24,
          Q: osc.filterQ,
        },
        envelope: {
          attack: osc.attack,
          decay: osc.decay,
          sustain: osc.sustain,
          release: osc.release,
        },
      }).toDestination();
      monoSynth.volume.value = (osc.volume / 100) * -60;
      monoSynth.connect(analyserRef.current);
      return monoSynth;
    });

    const noiseSynth = new Tone.Noise(noise.type as Tone.NoiseType).start();
    const noiseEnv = new Tone.AmplitudeEnvelope({
      attack: 0.1,
      decay: 0.2,
      sustain: 0.5,
      release: 0.3,
    }).toDestination();
    noiseSynth.connect(noiseEnv);
    noiseEnv.connect(analyserRef.current);
    noiseSynth.volume.value = (noise.volume / 100) * -60;

    noiseSynthRef.current = noiseSynth;
    noiseEnvRef.current = noiseEnv;

    return () => {
      synthRefs.current.forEach((synth) => synth.dispose());
      noiseSynth.dispose();
      noiseEnv.dispose();
    };
  }, [oscillators, noise]);

  const playNote = () => {
    const now = Tone.now();
    oscillators.forEach((osc, index) => {
      if (osc.isActive) {
        synthRefs.current[index].triggerAttackRelease("C4", "8n", now);
      }
    });
    noiseEnvRef.current?.triggerAttackRelease("8n", now);
  };

  const toggleLoop = () => {
    setIsLooping((prev) => !prev);
  };

  useEffect(() => {
    if (isLooping) {
      loopRef.current = new Tone.Loop(() => {
        playNote();
      }, "1m").start(0);
      Tone.Transport.start();
    } else {
      if (loopRef.current) {
        loopRef.current.stop();
        loopRef.current.cancel();
        loopRef.current = null;
      }
      Tone.Transport.stop();
    }
  }, [isLooping]);

  return (
    <div className="track bg-gray-900 text-white p-4 rounded-lg shadow-md flex flex-col items-center w-full max-w-screen-lg">
      <div className="mb-4 flex space-x-4">
        <button
          onClick={playNote}
          className="bg-gray-700 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600"
        >
          Play Note
        </button>
        <button
          onClick={toggleLoop}
          className={`bg-gray-700 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 ${
            isLooping ? "bg-green-500" : ""
          }`}
        >
          {isLooping ? "Stop Loop" : "Loop"}
        </button>
      </div>
      <div className="mb-4">
        <WaveformVisualizer analyser={analyserRef.current} />
      </div>
      <div className="flex flex-row justify-between gap-4">
        <MixerSection
          oscillators={oscillators}
          noise={noise}
          setOscillators={setOscillators}
          setNoise={setNoise}
        />
        <NoiseGenerator noise={noise} setNoise={setNoise} />
      </div>
      <div className="flex flex-row justify-between gap-4">
        {oscillators.map((osc, index) => (
          <OscillatorSection
            key={index}
            index={index}
            osc={osc}
            setOscillators={setOscillators}
          />
        ))}
      </div>
    </div>
  );
};

export default SynthScreen;
