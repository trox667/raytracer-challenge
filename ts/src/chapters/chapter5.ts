import * as fs from 'fs/promises'
import { color, Point, point, vector, Color } from '../features/tuples'
import { Canvas, canvas, canvasToPPM, writePixel } from './../features/canvas'
import { sphere, intersect } from '../features/sphere'
import { ray } from '../features/rays'

const c = canvas(100, 100)

const cameraPosition = point(0, 0, -10)
const s = sphere()

for (let y = -50; y < 50; y++) {
  for (let x = -50; x < 50; x++) {
    const p = point(x / 100, y / 100, 0)
    const dir = vector(x / 100, y / 100, 1)
    const hits = intersect(s, ray(cameraPosition, dir))
    if (hits.length > 0) {
      plot(c, p, color(1, 0, 0))
    }
    else plot(c, p, color(0, 0, 0))
  }
}

writeToFile(canvasToPPM(c))

function plot(canvas: Canvas, position: Point, color: Color) {
  const [x, y] = position
  const scale = 100
  const sX = Math.round(x * scale) + 50
  const sY = Math.round(y * scale) + 50
  const flippedY = c.height - sY

  if (inBounds(canvas, point(sX, flippedY, 0)))
    writePixel(canvas, sX, flippedY, color)
}

function inBounds(canvas: Canvas, position: Point): boolean {
  const [x, y] = position
  const { width, height } = canvas
  if (x < 0 || x > width) return false
  if (y < 0 || y > height) return false
  return true
}

function writeToFile(ppm: string) {
  fs.writeFile('chapter5.ppm', ppm, 'utf-8')
    .then(() => console.log('export done'))
    .catch((e) => console.log('Error exporting ppm', e))
}
