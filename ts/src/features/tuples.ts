import { isEqual as isFloatEqual, Result, zip } from '../util'

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

export function add(a: Tuple, b: Tuple): Result<Tuple> {
  const [ax, ay, az, aw] = a
  const [bx, by, bz, bw] = b
  if (aw + bw > 1.0) {
    return Error('Cannot add two points')
  }
  return [ax + bx, ay + by, az + bz, aw + bw]
}

export function sub(a: Tuple, b: Tuple): Result<Tuple> {
  const [ax, ay, az, aw] = a
  const [bx, by, bz, bw] = b
  if (aw - bw <= -1.0) {
    return Error('Cannot subtract a point from a vector')
  }
  return [ax - bx, ay - by, az - bz, aw - bw]
}

export function negate(a: Tuple): Result<Tuple> {
  const zero: Tuple = [0, 0, 0, 0]
  return sub(zero, a)
}
