import { unwrap } from '../util'
import { add, mulScalar, Point, Vector } from './tuples'
import {Matrix4x4} from './matrices'

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

export function transform(ray: Ray, m: Matrix4x4): Ray {
  const o = m.mulVec(ray.origin)
  const d = m.mulVec(ray.direction)
  return new Ray(o,d)
}
