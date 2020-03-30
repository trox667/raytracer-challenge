import { Sphere } from './rays'
import { Tuple, sub, normalize, multiplyScalar, dot } from './tuples'
import { inverse, transform4, transpose4x4 } from './matrices'

export const normalAt = (sphere: Sphere, point: Tuple) => {
  const inverseTransform = inverse(sphere.transform)
  const objectPoint = transform4(inverseTransform, point)
  const objectNormal = sub(objectPoint, sphere.origin)

  const transposeTransform = transpose4x4(inverseTransform)
  const worldNormal = transform4(transposeTransform, objectNormal)
  return normalize({
    x: worldNormal.x,
    y: worldNormal.y,
    z: worldNormal.z,
    w: 0,
  })
}

export const reflect = (dir: Tuple, normal: Tuple) =>
  sub(dir, multiplyScalar(normal, 2 * dot(dir, normal)))
