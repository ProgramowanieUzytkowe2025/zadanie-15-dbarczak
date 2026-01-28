import "./App.css";
import React, { useState } from "react";

import FileLoader from "./components/FileLoader";
import ProblemVisualization from "./components/ProblemVisualization";
import TspSolution from "./components/TspSolution";
import TspSolverControls from "./components/TspSolverControls";

import { computeTourLength, shuffleArray } from "./components/tsp";

export default function App() {
  const [points, setPoints] = useState([]);
  const [routeIds, setRouteIds] = useState([]);
  const [bestLength, setBestLength] = useState(0);

  const handleLoadPoints = (loadedPoints) => {
    setPoints(loadedPoints);

    const ids = loadedPoints.map((p) => p.id);
    const initialRoute = shuffleArray(ids);

    setRouteIds(initialRoute);
    setBestLength(computeTourLength(loadedPoints, initialRoute));
  };

  const handleBetterSolution = (newRouteIds, newLength) => {
    setRouteIds(newRouteIds);
    setBestLength(newLength);
  };

  return (
    <div className="app">
      <header className="appHeader">
        <h1>Travel Salesman Problem (TSP)</h1>
      </header>

      <main className="grid">
        <section>
          <FileLoader onLoadPoints={handleLoadPoints} />
        </section>

        <section className="rightCol">
          <ProblemVisualization points={points} />
          <TspSolution points={points} routeIds={routeIds} length={bestLength} />
          <TspSolverControls
            points={points}
            currentRouteIds={routeIds}
            currentLength={bestLength}
            onBetterSolution={handleBetterSolution}
          />
        </section>
      </main>
    </div>
  );
}
