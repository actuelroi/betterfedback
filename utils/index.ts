
import * as fabric from 'fabric'

export function parseLinearGradientString(
  gradient: string,
  canvas: fabric.Canvas
) {
  const angleMatch = gradient.match(/linear-gradient\((\d+)deg/);
  const angle = angleMatch ? parseInt(angleMatch[1]) : 0;

  const colorStopMatches = [
    ...gradient.matchAll(/(rgba?\([^)]+\)|#[0-9a-fA-F]+)\s+([\d.]+)%/g),
  ];

  const colorStops = colorStopMatches.map(([_, color, offset]) => ({
    color,
    offset: parseFloat(offset) / 100,
  }));

  // Convert angle to x2/y2 based on canvas dimensions
  const radians = (angle * Math.PI) / 180;
  const x2 = Math.cos(radians) * canvas.width!;
  const y2 = Math.sin(radians) * canvas.height!;

  return new fabric.Gradient({
    type: "linear",
    coords: {
      x1: 0,
      y1: 0,
      x2,
      y2,
    },
    colorStops,
  });
}