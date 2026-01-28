import React, { useEffect, useRef, useState } from "react";
import { computeTourLength, shuffleArray } from "./tsp";

export default function TspSolverControls({
  points,
  currentRouteIds,
  currentLength,
  onBetterSolution,
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [iterations, setIterations] = useState(0);

  const intervalRef = useRef(null);

  const pointsRef = useRef(points);
  const lengthRef = useRef(currentLength);
  const onBetterRef = useRef(onBetterSolution);

  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  useEffect(() => {
    lengthRef.current = currentLength;
  }, [currentLength]);

  useEffect(() => {
    onBetterRef.current = onBetterSolution;
  }, [onBetterSolution]);

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const start = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      const pts = pointsRef.current;
      if (!pts || pts.length < 2) return;

      const ids = pts.map((p) => p.id);
      const candidate = shuffleArray(ids);
      const candLen = computeTourLength(pts, candidate);

      setIterations((it) => it + 1);

      const bestLen = lengthRef.current;


      if (bestLen <= 0 || candLen < bestLen) {
        lengthRef.current = candLen;
        onBetterRef.current?.(candidate, candLen);
      }
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const disabled = !points || points.length < 2 || !currentRouteIds || currentRouteIds.length < 2;

  return (
    <div className="card">
      <div className="cardHeader">
        <h2>Monte Carlo</h2>
        <p className="muted">Co 5 sekund losuje nowe rozwiązanie i podmienia tylko lepsze.</p>
      </div>

      <div className="controlsRow">
        <button
          className="btn"
          disabled={disabled}
          onClick={() => {
            if (isRunning) stop();
            else start();
          }}
        >
          {isRunning ? "Przerwa" : "Szukaj rozwiązania"}
        </button>

        <div className="iterBox">
          <span className="muted">Iteracje: </span>
          <b>{iterations}</b>
        </div>
      </div>

      {disabled && <p className="muted" style={{ marginTop: 10 }}>Najpierw wczytaj dane.</p>}
    </div>
  );
}
