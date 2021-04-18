import { unwrap } from '../util'
import { Ray } from './rays'
import { dot, point, sub } from './tuples'

export class Sphere {
  constructor() {}
}

export function sphere(): Sphere {
  return new Sphere()
}

export function intersect(s: Sphere, r: Ray) {
  const sphereToRay = unwrap(sub(r.origin, point(0, 0, 0)))
  const a = unwrap(dot(r.direction, r.direction))
  const b = 2 * unwrap(dot(r.direction, sphereToRay))
  const c = unwrap(dot(sphereToRay, sphereToRay)) - 1

  const discriminant = b * b - 4 * a * c
  if (discriminant < 0) return []
  const t1 = (-b - Math.sqrt(discriminant)) / (2 * a)
  const t2 = (-b + Math.sqrt(discriminant)) / (2 * a)
  return [t1, t2]
}
