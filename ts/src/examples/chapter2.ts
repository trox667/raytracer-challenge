import * as fs from 'fs'
import {
  projectile,
  environment,
  Projectile,
  Environment,
  tick,
} from './chapter1'
import {
  vector,
  normalize,
  multiplyScalar,
  point,
  color,
} from '../features/tuples'
import { canvas, Canvas, writePixel, canvasToPPM } from '../features/canvas'
import { clamp } from '../util'

// Canvas y=0 at top, projectile.position.y=0 at bottom
// convert for storage in canvas:
// y = canvas.height - projectile.position.y

// keep projectile position inside the bounds of the canvas

// convert projectile position float values to int bevore writing them to the canvas

// save canvas to a file

const start = point(0, 1, 0)
const velocity = multiplyScalar(normalize(vector(1, 1.8, 0)), 11.25)

const gravity = vector(0, -0.1, 0)
const wind = vector(-0.01, 0, 0)

const p = projectile(start, velocity)
const e = environment(gravity, wind)

const c = canvas(900, 550)

const renderPixel = (canvas: Canvas, projectile: Projectile) => {
  const x = Math.round(clamp(projectile.position.x, 0, canvas.width))
  const y = Math.round(clamp(canvas.height - projectile.position.y, 0, canvas.height))
  writePixel(canvas, x, y, color(1, 0, 0))
}

const run2 = (t: number = 0, p: Projectile, e: Environment) => {
  if (p.position.y > 0) {
    p = tick(e, p)
    renderPixel(c, p)
    run2(++t, p, e)
  }
  return
}

// run2(0, p, e)
// fs.writeFileSync('chapter2.ppm', canvasToPPM(c), 'utf8')