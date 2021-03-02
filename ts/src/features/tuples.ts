import { isEqual as isFloatEqual, zip } from '../util'

export type Tuple = [number, number, number, number]

export function isEqual(a: Tuple, b: Tuple): boolean {
  return zip(a, b).every(([a, b]) => isFloatEqual(a, b))
}

export function point(x: number, y: number, z: number): Tuple {
  return [x, y, z, 1.0]
}

export function vector(x: number, y: number, z: number): Tuple {
  return [x, y, z, 0.0]
}

export function isPoint(t: Tuple): boolean {
  const w = t[3]
  return isFloatEqual(w, 1.0)
}

export function isVector(t: Tuple): boolean {
  const w = t[3]
  return isFloatEqual(w, 0.0)
}
