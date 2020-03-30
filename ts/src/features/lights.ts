import {
  Tuple,
  color,
  normalize,
  sub,
  multiplyScalar,
  hadamardProduct,
  dot,
  negate,
  add,
} from './tuples'
import { reflect } from './spheres'

export interface Material {
  ambient: number
  diffuse: number
  specular: number
  shininess: number
  color: Tuple
}

export const material = (): Material => {
  return {
    ambient: 0.1,
    diffuse: 0.9,
    specular: 0.9,
    shininess: 200.0,
    color: color(1, 1, 1),
  }
}

export const setColor = (m: Material): Material => {
  return {
    ambient: m.ambient,
    diffuse: m.diffuse,
    specular: m.specular,
    shininess: m.shininess,
    color: m.color,
  }
}

export interface PointLight {
  position: Tuple
  intensity: Tuple
}

export const pointLight = (position: Tuple, intensity: Tuple): PointLight => {
  return { position, intensity }
}

export const lighting = (
  m: Material,
  light: PointLight,
  point: Tuple,
  eyev: Tuple,
  normalv: Tuple
): Tuple => {
  const effectiveColor = hadamardProduct(m.color, light.intensity)
  const lightv = normalize(sub(light.position, point))
  const ambient = multiplyScalar(effectiveColor, m.ambient)
  let diffuse = color(0, 0, 0)
  let specular = color(0, 0, 0)
  const lightDotNormal = dot(lightv, normalv)
  if (lightDotNormal >= 0) {
    diffuse = multiplyScalar(effectiveColor, m.diffuse * lightDotNormal)
  }
  const reflectv = reflect(negate(lightv), normalv)
  const reflectDotEye = dot(reflectv, eyev)
  if (reflectDotEye > 0) {
    const factor = Math.pow(reflectDotEye, m.shininess)
    specular = multiplyScalar(light.intensity, m.specular * factor)
  }

  return add(ambient, add(diffuse, specular))
}
