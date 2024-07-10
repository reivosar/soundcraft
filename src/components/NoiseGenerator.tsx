import React from "react";

type NoiseSettings = {
  type: string;
  volume: number;
};

type NoiseGeneratorProps = {
  noise: NoiseSettings;
  setNoise: React.Dispatch<React.SetStateAction<NoiseSettings>>;
};

const NoiseGenerator: React.FC<NoiseGeneratorProps> = ({ noise, setNoise }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4 flex flex-col items-center w-1/4">
      <h3 className="text-xl mb-4">Noise Generator</h3>
      <div className="flex mb-4">
        {["white", "pink", "brown"].map((type) => (
          <label key={type} className="text-white mr-4">
            <input
              type="radio"
              name="noiseType"
              value={type}
              checked={noise.type === type}
              onChange={(e) => setNoise({ ...noise, type: e.target.value })}
              className="mr-1"
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default NoiseGenerator;
