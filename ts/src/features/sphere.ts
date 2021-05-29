import { intersection, Intersection } from './intersections'
import { Ray, transform } from './rays'
import { dot, point, sub, normalize, Point, Vector } from './tuples'
import { identityMatrix4x4, Matrix4x4 } from './matrices'

export class Sphere {
  public transform: Matrix4x4

  constructor() {
    this.transform = identityMatrix4x4()
  }
}

export function sphere(): Sphere {
  return new Sphere()
}

export function intersect(s: Sphere, r: Ray): Intersection[] {
  const i = s.transform.inverse()
  const tr = transform(r, i)

  const sphereToRay = sub(tr.origin, point(0, 0, 0))
  const a = dot(tr.direction, tr.direction)
  const b = 2 * dot(tr.direction, sphereToRay)
  const c = dot(sphereToRay, sphereToRay) - 1

  const discriminant = b * b - 4 * a * c
  if (discriminant < 0) return []
  const t1 = (-b - Math.sqrt(discriminant)) / (2 * a)
  const t2 = (-b + Math.sqrt(discriminant)) / (2 * a)
  return [intersection(t1, s), intersection(t2, s)]
}

export function setTransform(s: Sphere, m: Matrix4x4): void {
  s.transform = m
}

export function normalAt(s: Sphere, p: Point): Vector {
  console.log(s.transform)
  const i = s.transform.inverse()
  const localPoint = i.mulVec(p)
  const localNormal = sub(localPoint, point(0,0,0))
  const worldNormal = i.transpose().mulVec(localNormal)
  worldNormal[3] = 0

  return normalize(worldNormal)
}
