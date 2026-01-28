import React, { useMemo } from "react";
import { computeTourLength } from "./tsp";

export default function TspSolution({ points, routeIds, length }) {
  const { displayPath, computedLength } = useMemo(() => {
    if (!routeIds || routeIds.length === 0) {
      return { displayPath: "", computedLength: 0 };
    }

    const path = [...routeIds, routeIds[0]].join(" -> ");
    const len = typeof length === "number" ? length : computeTourLength(points, routeIds);

    return { displayPath: path, computedLength: len };
  }, [points, routeIds, length]);

  return (
    <div className="card">
      <div className="cardHeader">
        <h2>Rozwiązanie</h2>
        <p className="muted">Wylosowane / znalezione najlepsze rozwiązanie (cykl).</p>
      </div>

      {!routeIds || routeIds.length === 0 ? (
        <p className="muted">Najpierw wczytaj dane.</p>
      ) : (
        <>
          <div className="solutionPath" title={displayPath}>
            {displayPath}
          </div>

          <div style={{ marginTop: 10 }}>
            <span className="muted">Długość trasy: </span>
            <b>{computedLength.toFixed(2)}</b>
          </div>
        </>
      )}
    </div>
  );
}
