import * as fs from 'fs'
import { canvas, writePixel, canvasToPPM } from "../features/canvas";
import { point, color, add, multiplyScalar } from "../features/tuples";
import { translation, rotationZ } from "../features/transformations";
import { rangeZero, toDeg, clamp } from "../util";
import { mul4x4, transform4 } from "../features/matrices";

const c = canvas(200, 200)
const white = color(1, 1, 1)
const origin = point(100, 100, 0)
const twelve = point(0, 1, 0)


const step = 2 * Math.PI / 12

rangeZero(12).forEach(i => {
  const rad = i * step
  const rot = rotationZ(rad)

  const p = transform4(rot, twelve)
  const r = add(origin, multiplyScalar(p, 80))
  writePixel(c, r.x, r.y, white)
})

// fs.writeFileSync('chapter4.ppm', canvasToPPM(c), 'utf8')
