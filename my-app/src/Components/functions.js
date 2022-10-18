export const intersection = (p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) => {
  var d1x = p1x - p0x,
    d1y = p1y - p0y,
    d2x = p3x - p2x,
    d2y = p3y - p2y,
    d = d1x * d2y - d2x * d1y,
    px,
    py,
    s,
    t;

  if (d) {
    px = p0x - p2x;
    py = p0y - p2y;

    s = (d1x * py - d1y * px) / d;
    if (s >= 0 && s <= 1) {
      t = (d2x * py - d2y * px) / d;
      if (t >= 0 && t <= 1) {
        return { x: p0x + t * d1x, y: p0y + t * d1y };
      }
    }
  }
  return null;
};
