import { rangeZero, clamp } from '../util'
import { color, Tuple, red, green, blue } from './tuples'

interface Canvas {
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
  return `P3
${canvas.width} ${canvas.height}
255`
}

export const canvasToPPM = (canvas: Canvas): string => {
  const transform = (c: number) => clamp(c * 256, 0, 255)
  let s = `${canvasToPPMHeader(canvas)}\n`
  rangeZero(canvas.height).forEach(y => {
    let l = ``
    rangeZero(canvas.width).forEach(x => {
      const p = getPixel(canvas, x, y)
      l += `${transform(red(p))} ${transform(green(p))} ${transform(blue(p))}`
      if (x < canvas.width-1) l += ` `
    })
    s += `${l}\n`
  })
  console.log(s)
  return s
}
