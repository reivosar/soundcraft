import React from "react";
import Header from "./components/Header";
import TrackList from "./components/TrackList";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Header />
      <main className="p-4 container mx-auto flex flex-col items-center">
        <TrackList />
      </main>
    </div>
  );
};

export default App;
