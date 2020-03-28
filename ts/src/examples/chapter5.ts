import * as fs from 'fs'
import { canvas, canvasToPPM, writePixel } from '../features/canvas'
import {
  sphere,
  setTransform,
  ray,
  intersect,
  hit,
  position,
} from '../features/rays'
import { translation, scaling } from '../features/transformations'
import { mul4x4 } from '../features/matrices'
import { point, vector, color, normalize, sub } from '../features/tuples'
import { rangeZero, clamp } from '../util'

const red = color(1, 0, 0)
const c = canvas(100, 100)
const wallZ = 10
const wallSize = 7
const pixelSize = wallSize / 100
const half = wallSize / 2
const translate = translation(0, 0, wallZ)
const s = sphere()
setTransform(s, translate)
const rayOrigin = point(0, 0, -5)

rangeZero(100).forEach(y => {
  const worldY = half - pixelSize * y
  rangeZero(100).forEach(x => {
    const worldX = -half + pixelSize * x
    const position = point(worldX, worldY, wallZ)
    const r = ray(rayOrigin, normalize(sub(position, rayOrigin)))
    const xs = intersect(s, r)
    const h = hit(xs)
    if (h) {
      const ix = Math.round(clamp(x, 0, c.width))
      const iy = Math.round(clamp(c.height - y, 0, c.height))
      writePixel(c, ix, iy, red)
    }
  })
})

// fs.writeFileSync('chapter5.ppm', canvasToPPM(c), 'utf8')
