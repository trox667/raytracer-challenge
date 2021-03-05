import { Result } from '../util'
import { color, Color } from './tuples'

export type Canvas = {
  width: number
  height: number
  pixels: Array<Color>
}

export function canvas(width: number, height: number): Canvas {
  const pixels = Array.from(Array(width * height), (_) => color(0, 0, 0))
  return { width, height, pixels }
}

export function writePixel(
  canvas: Canvas,
  x: number,
  y: number,
  color: Color
): boolean {
  const idx = y * canvas.width + x
  if (idx >= 0 && idx < canvas.pixels.length) {
    canvas.pixels[idx] = [...color]
    return true
  } else {
    return false
  }
}

export function pixelAt(canvas: Canvas, x: number, y: number): Result<Color> {
  const idx = y * canvas.width + x
  if (idx >= 0 && idx < canvas.pixels.length) {
    return [...canvas.pixels[idx]]
  } else {
    return Error(`Cannot get pixel at: ${idx}`)
  }
}
