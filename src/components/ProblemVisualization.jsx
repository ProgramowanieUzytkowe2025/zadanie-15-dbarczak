import React, { useMemo } from "react";

export default function ProblemVisualization({ points, width = 760, height = 420 }) {
  const { mappedPoints, viewBox } = useMemo(() => {
    const pad = 18;

    if (!points || points.length === 0) {
      return {
        mappedPoints: [],
        viewBox: `0 0 ${width} ${height}`,
      };
    }

    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const dx = Math.max(maxX - minX, 1e-9);
    const dy = Math.max(maxY - minY, 1e-9);

    const scale = Math.min((width - 2 * pad) / dx, (height - 2 * pad) / dy);

    const usedW = dx * scale;
    const usedH = dy * scale;
    const offsetX = (width - usedW) / 2;
    const offsetY = (height - usedH) / 2;

    const mapped = points.map((p) => {
      const x = offsetX + (p.x - minX) * scale;
      const y = height - (offsetY + (p.y - minY) * scale);
      return { ...p, sx: x, sy: y };
    });

    return {
      mappedPoints: mapped,
      viewBox: `0 0 ${width} ${height}`,
    };
  }, [points, width, height]);

  return (
    <div className="card">
      <div className="cardHeader">
        <h2>Wizualizacja problemu</h2>
        <p className="muted">
          Punkty są skalowane z zachowaniem proporcji odległości (np. miara Euklidesowa).
        </p>
      </div>

      <div className="vizWrap">
        <svg
          className="viz"
          width={width}
          height={height}
          viewBox={viewBox}
          role="img"
          aria-label="Wizualizacja punktów"
        >
          <rect x="0" y="0" width={width} height={height} className="vizBg" />

          {mappedPoints.map((p) => (
            <g key={p.id}>
              <circle cx={p.sx} cy={p.sy} r="4" className="vizPoint" />
              <text x={p.sx + 6} y={p.sy - 6} className="vizLabel">
                {p.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="muted" style={{ marginTop: 10 }}>
        Wczytane punkty: <b>{points?.length ?? 0}</b>
      </div>
    </div>
  );
}
