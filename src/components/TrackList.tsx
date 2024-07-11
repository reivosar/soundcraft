import React, { useState } from "react";
import SynthScreen from "./SynthScreen";
import DrumMachineScreen from "./DrumMachineScreen";

const TrackList: React.FC = () => {
  const [selectedScreen, setSelectedScreen] = useState<"synth" | "drum">(
    "synth"
  );

  return (
    <div className="space-y-6 mt-6 w-full flex flex-col items-center">
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setSelectedScreen("synth")}
          className={`bg-gray-700 text-white px-6 py-2 rounded shadow-md hover:bg-gray-600 ${
            selectedScreen === "synth" ? "bg-green-500" : ""
          }`}
        >
          Synthesizer
        </button>
        <button
          onClick={() => setSelectedScreen("drum")}
          className={`bg-gray-700 text-white px-6 py-2 rounded shadow-md hover:bg-gray-600 ${
            selectedScreen === "drum" ? "bg-green-500" : ""
          }`}
        >
          Drum Machine
        </button>
      </div>
      {selectedScreen === "synth" ? <SynthScreen /> : <DrumMachineScreen />}
    </div>
  );
};

export default TrackList;
