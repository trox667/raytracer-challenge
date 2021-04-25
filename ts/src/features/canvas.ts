import { wrap } from '../util'
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

export function pixelAt(canvas: Canvas, x: number, y: number): Color {
  const idx = y * canvas.width + x
  if (idx >= 0 && idx < canvas.pixels.length) {
    return [...canvas.pixels[idx]]
  } else {
    throw Error(`Cannot get pixel at: ${idx}`)
  }
}

export function canvasToPPM(canvas: Canvas): string {
  const header = `P3\n${canvas.width} ${canvas.height}\n255\n`
  const clamp = (value: number) => Math.min(Math.max(value, 0), 255)

  let data = []
  let line = ''
  let i = 0
  for (const pixel of canvas.pixels) {
    i++
    const [r, g, b] = pixel
    line +=
      clamp(Math.round(r * 255)) +
      ' ' +
      clamp(Math.round(g * 255)) +
      ' ' +
      clamp(Math.round(b * 255)) +
      ' '
    if (i === canvas.width) {
      line = line.trimEnd()
      const lines = wrap(line).join('\n')
      data.push(lines)
      line = ''
      i = 0
    }
  }
  return header + data.join('\n') + '\n'
}
