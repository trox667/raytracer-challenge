import * as fs from 'fs/promises'
import { Canvas, canvas, canvasToPPM, writePixel } from '../features/canvas'
import {
  add,
  color,
  mulScalar,
  normalize,
  Point,
  point,
  Tuple,
  vector,
} from '../features/tuples'
import { isOk, unwrap } from '../util'

type Projectile = { position: Tuple; velocity: Tuple }

type Environment = { gravity: Tuple; wind: Tuple }

const c = canvas(900, 550)

function tick(env: Environment, proj: Projectile): Projectile {
  const position = unwrap(add(proj.position, proj.velocity))
  const envVel = unwrap(add(env.gravity, env.wind))
  const velocity = add(proj.velocity, envVel as Tuple)
  plot(c, position as Point)
  // console.log(position)
  return { position: position as Tuple, velocity: velocity as Tuple }
}

let p: Projectile = {
  position: point(0, 1, 0),
  velocity: normalize(unwrap(mulScalar(vector(1, 1.8, 0), 11.25))) as Tuple,
}

const e: Environment = {
  gravity: vector(0, -0.1, 0),
  wind: vector(-0.01, 0, 0),
}

let steps = 0
while (p.position[1] > 0.0) {
  steps++
  p = tick(e, p)
}

writeToFile(canvasToPPM(c))

function plot(canvas: Canvas, position: Point) {
  const [x, y] = position
  const scale = 100
  const sX = Math.round(x * scale)
  const sY = Math.round(y * scale)
  const flippedY = c.height - sY

  if (inBounds(canvas, point(sX, flippedY, 0)))
    writePixel(canvas, sX, flippedY, color(1, 0, 0))
}

function inBounds(canvas: Canvas, position: Point): boolean {
  const [x, y] = position
  const { width, height } = canvas
  if (x < 0 || x > width) return false
  if (y < 0 || y > height) return false
  return true
}

function writeToFile(ppm: string) {
  fs.writeFile('chapter2.ppm', ppm, 'utf-8')
    .then(() => console.log('export done'))
    .catch((e) => console.log('Error exporting ppm', e))
}
