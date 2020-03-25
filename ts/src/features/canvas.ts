import { rangeZero, clamp } from '../util'
import { color, Tuple, red, green, blue } from './tuples'

export interface Canvas {
  width: number
  height: number
  pixel: Tuple[]
}

export const canvas = (width: number, height: number): Canvas => {
  const pixel = rangeZero(width * height).map(_ => color(0, 0, 0))
  return {
    width,
    height,
    pixel,
  }
}

const index = (width: number, x: number, y: number): number => x + y * width

export const writePixel = (
  canvas: Canvas,
  x: number,
  y: number,
  color: Tuple
) => {
  const i = index(canvas.width, x, y)
  canvas.pixel[i] = color
}

export const getPixel = (canvas: Canvas, x: number, y: number): Tuple => {
  const i = index(canvas.width, x, y)
  return canvas.pixel[i]
}

export const canvasToPPMHeader = (canvas: Canvas): string => {
  return ['P3', '' + canvas.width + ' ' + canvas.height, '255'].join('\n')
}

export const canvasToPPM = (canvas: Canvas): string => {
  const transform = (c: number) => clamp(Math.round(c * 255), 0, 255)

  const row = (canvas: Canvas, y: number) => {
    return rangeZero(canvas.width)
      .reduce((text: string, x: number) => {
        const p = getPixel(canvas, x, y)
        return `${text} ${transform(red(p))} ${transform(green(p))} ${transform(
          blue(p)
        )}`
      }, '')
      .trim()
  }

  let s = canvasToPPMHeader(canvas) + '\n'

  s +=
    rangeZero(canvas.height)
      .map((y: number) => row(canvas, y))
      .map((r: string) => keepLength(r))
      .join('\n') + '\n'
  return s
}

const keepLength = (line: string): string => {
  const maxLength = 70
  if (line.length < maxLength) return line

  const components = line.split(' ')
  let count = 0
  let lines = []
  let s = []
  for (let c of components) {
    if (count + c.length + 1 < maxLength) {
      count += c.length + 1
      s.push(c)
    } else {
      lines.push(s.join(' '))
      s = [c]
      count = 0
    }
  }
  if (s.length > 0) lines.push(s.join(' '))

  return lines.join('\n')
}
