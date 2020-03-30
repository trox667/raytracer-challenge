import { Tuple, add, multiplyScalar, sub, point, dot } from './tuples'
import { Matrix, transform4, identity4x4, clone, inverse } from './matrices'
import { Material, material } from './lights'

export interface Ray {
  origin: Tuple
  direction: Tuple
}

export interface Sphere {
  origin: Tuple
  transform: Matrix
  material: Material
}

export interface Intersection {
  t: number
  object: any
}

export const intersection = (t: number, object: any): Intersection => {
  return { t, object }
}

export const intersections = (
  i1: Intersection,
  i2: Intersection,
  ...more
): Intersection[] => {
  return [i1, i2, ...more]
}

export const sphere = () => {
  return { origin: point(0, 0, 0), transform: identity4x4(), material: material() }
}

export const setTransform = (s: Sphere, t: Matrix): void => {
  s.transform = clone(t)
}

export const ray = (origin: Tuple, direction: Tuple): Ray => {
  return { origin, direction }
}

export const position = (ray: Ray, t: number): Tuple =>
  add(ray.origin, multiplyScalar(ray.direction, t))

export const intersect = (s: Sphere, ray: Ray): Intersection[] => {
  const rayInverse = transform(ray, inverse(s.transform))
  const sphereToRay = sub(rayInverse.origin, s.origin)
  const a = dot(rayInverse.direction, rayInverse.direction)
  const b = 2 * dot(rayInverse.direction, sphereToRay)
  const c = dot(sphereToRay, sphereToRay) - 1

  const discriminant = b * b - 4 * a * c
  if (discriminant < 0) return []
  const t1 = (-b - Math.sqrt(discriminant)) / (2 * a)
  const t2 = (-b + Math.sqrt(discriminant)) / (2 * a)
  return intersections(intersection(t1, s), intersection(t2, s))
}

export const hit = (intersections: Intersection[]): Intersection => {
  const xs = intersections
    .sort((a: Intersection, b: Intersection) => a.t - b.t)
    .filter((a: Intersection) => a.t >= 0)
  return xs.length > 0 ? xs[0] : null
}

export const transform = (ray: Ray, m: Matrix): Ray => {
  const origin = transform4(m, ray.origin)
  const direction = transform4(m, ray.direction)
  return { origin, direction }
}
