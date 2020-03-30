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
import {
  point,
  vector,
  color,
  normalize,
  sub,
  negate,
} from '../features/tuples'
import { rangeZero, clamp } from '../util'
import { material, pointLight, lighting } from '../features/lights'
import { normalAt } from '../features/spheres'

const c = canvas(100, 100)
const wallZ = 10
const wallSize = 7
const pixelSize = wallSize / 100
const half = wallSize / 2
const translate = translation(0, 0, wallZ)

const s = sphere()
s.material = material()
s.material.color = color(1, 0.2, 1)

const lightPosition = point(-10, 10, -10)
const lightColor = color(1, 1, 1)
const light = pointLight(lightPosition, lightColor)

setTransform(s, translate)
const rayOrigin = point(0, 0, -5)

rangeZero(100).forEach(y => {
  const worldY = half - pixelSize * y
  const iy = Math.round(clamp(y, 0, c.height))
  rangeZero(100).forEach(x => {
    const worldX = -half + pixelSize * x
    const pos = point(worldX, worldY, wallZ)
    const r = ray(rayOrigin, normalize(sub(pos, rayOrigin)))
    const xs = intersect(s, r)
    const h = hit(xs)
    if (h) {
      const point = position(r, h.t)
      const normal = normalAt(h.object, point)
      const eye = negate(r.direction)
      const color = lighting(h.object.material, light, point, eye, normal)
      const ix = Math.round(clamp(x, 0, c.width))

      writePixel(c, ix, iy, color)
    }
  })
})

// fs.writeFileSync('chapter6.ppm', canvasToPPM(c), 'utf8')
