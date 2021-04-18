import { unwrap } from '../util'
import { add, mulScalar, Point, Vector } from './tuples'

export class Ray {
  constructor(public origin: Point, public direction: Vector) {}
}

export function ray(origin: Point, direction: Vector): Ray {
  return new Ray(origin, direction)
}

export function position(ray: Ray, t: number): Point {
  const b = unwrap(mulScalar(ray.direction, t))
  const a = add(ray.origin, b)
  return unwrap(a)
}
