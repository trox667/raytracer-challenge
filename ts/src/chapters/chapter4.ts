import * as fs from 'fs/promises'
import { rotationZ, scaling, translation } from '../features/transformations'
import { color, Point, point } from '../features/tuples'
import { Canvas, canvas, canvasToPPM, writePixel } from './../features/canvas'

const c = canvas(800, 800)

const origin = point(0, 0, 0)

const T = translation(1, 1, 0)
const S = scaling(400, 400, 0)
const M = S.mul(T)

const p = M.mulVec(origin)

plot(c, p)

for (let a = 0; a < 2 * Math.PI; a += Math.PI / 6) {
  const R = rotationZ(a)
  const M1 = S.mul(T).mul(R)
  const p1 = M1.mulVec(point(0, 0.7, 0))
  plot(c, p1)
}

writeToFile(canvasToPPM(c))

function plot(canvas: Canvas, position: Point) {
  const [x, y] = position
  const scale = 1
  const sX = Math.round(x * scale)
  const sY = Math.round(y * scale)
  const flippedY = c.height - sY

  if (inBounds(canvas, point(sX, flippedY, 0)))
    writePixel(canvas, sX, flippedY, color(1, 1, 1))
}

function inBounds(canvas: Canvas, position: Point): boolean {
  const [x, y] = position
  const { width, height } = canvas
  if (x < 0 || x > width) return false
  if (y < 0 || y > height) return false
  return true
}

function writeToFile(ppm: string) {
  fs.writeFile('chapter4.ppm', ppm, 'utf-8')
    .then(() => console.log('export done'))
    .catch((e) => console.log('Error exporting ppm', e))
}
