export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function euclidean(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function computeTourLength(points, routeIds) {
  if (!points || points.length === 0) return 0;
  if (!routeIds || routeIds.length < 2) return 0;

  const map = new Map(points.map((p) => [p.id, p]));

  let sum = 0;
  for (let i = 0; i < routeIds.length - 1; i++) {
    const p1 = map.get(routeIds[i]);
    const p2 = map.get(routeIds[i + 1]);
    if (!p1 || !p2) return 0;
    sum += euclidean(p1, p2);
  }

  const last = map.get(routeIds[routeIds.length - 1]);
  const first = map.get(routeIds[0]);
  if (!last || !first) return 0;
  sum += euclidean(last, first);

  return sum;
}
