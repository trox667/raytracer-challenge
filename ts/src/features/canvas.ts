import { rangeZero } from '../util'
import { color, Tuple } from './tuples'

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

export const writePixel = (canvas: Canvas, x: number, y: number, color: Tuple) => {
  const i = index(canvas.width, x, y)
  canvas.pixel[i] = color
}

export const getPixel = (canvas: Canvas, x: number, y: number): Tuple => {
  const i = index(canvas.width, x, y)
  return canvas.pixel[i]
}