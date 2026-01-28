import React from "react";

export default function FileLoader({ onLoadPoints }) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = String(event.target?.result ?? "");
      const lines = text.split(/\r?\n/);

      const points = [];
      let readingCoords = false;

      for (let line of lines) {
        line = line.trim();

        if (line === "NODE_COORD_SECTION") {
          readingCoords = true;
          continue;
        }
        if (line === "EOF") break;
        if (!readingCoords || line === "") continue;

        const parts = line.split(/\s+/);
        if (parts.length < 3) continue;

        const id = parseInt(parts[0], 10);
        const x = parseFloat(parts[1]);
        const y = parseFloat(parts[2]);

        if (!Number.isNaN(id) && !Number.isNaN(x) && !Number.isNaN(y)) {
          points.push({ id, x, y });
        }
      }

      onLoadPoints(points);
    };

    reader.readAsText(file);
  };

  return (
    <div className="card">
      <div className="cardHeader">
        <h2>Wczytaj dane</h2>
      </div>

      <input type="file" accept=".txt,.tsp" onChange={handleFileChange} />
    </div>
  );
}
