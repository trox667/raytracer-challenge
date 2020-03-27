import { Tuple, add, multiplyScalar, sub, point, dot } from './tuples'

export interface Ray {
  origin: Tuple
  direction: Tuple
}

export interface Sphere {
  origin: Tuple
}

export interface Intersection {
  t: number
  object: any
}

export const intersection = (t: number, object: any): Intersection => {
  return { t, object }
}

export const intersections = (i1: Intersection, i2: Intersection, ...more): Intersection[] => {
  return [i1, i2, ...more]
}

export const sphere = () => {
  return { origin: point(0, 0, 0) }
}

export const ray = (origin: Tuple, direction: Tuple): Ray => {
  return { origin, direction }
}

export const position = (ray: Ray, t: number): Tuple =>
  add(ray.origin, multiplyScalar(ray.direction, t))

export const intersect = (s: Sphere, ray: Ray): number[] => {
  const sphereToRay = sub(ray.origin, s.origin)
  const a = dot(ray.direction, ray.direction)
  const b = 2 * dot(ray.direction, sphereToRay)
  const c = dot(sphereToRay, sphereToRay) - 1

  const discriminant = b * b - 4 * a * c
  if (discriminant < 0) return []
  const t1 = (-b - Math.sqrt(discriminant)) / (2 * a)
  const t2 = (-b + Math.sqrt(discriminant)) / (2 * a)
  return [t1, t2]
}
