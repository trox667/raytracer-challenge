import { isEqual as isFloatEqual, isOk, Result, zip } from '../util'

export type Tuple = [number, number, number, number]
export type Vector = Tuple
export type Point = Tuple
export type Color = Tuple

export function isEqual(a: Tuple, b: Tuple): boolean {
  return zip(a, b).every(([a, b]) => isFloatEqual(a, b))
}

export function tuple(x: number, y: number, z: number, w: number): Tuple {
  return [x, y, z, w]
}

export function point(x: number, y: number, z: number): Point {
  return tuple(x, y, z, 1.0)
}

export function vector(x: number, y: number, z: number): Vector {
  return tuple(x, y, z, 0.0)
}

export function color(r: number, g: number, b: number): Color {
  return tuple(r, g, b, 0.0)
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
  if (a[3] + b[3] > 1.0) {
    return Error('Cannot add two points')
  }
  return zip(a, b).map(([a, b]) => a + b) as Tuple
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

export function mulScalar(a: Tuple, b: number): Result<Tuple> {
  return a.map((v) => v * b) as Tuple
}

export function divScalar(a: Tuple, b: number): Result<Tuple> {
  if (isFloatEqual(b, 0)) {
    return Error('Cannot divide by zero')
  }
  return mulScalar(a, 1 / b)
}

export function magnitude(a: Tuple): Result<number> {
  const [x, y, z] = a
  return Math.sqrt(x * x + y * y + z * z)
}

export function normalize(a: Tuple): Result<Tuple> {
  const m = magnitude(a)
  if (!isOk(m)) {
    return Error('Cannot normalize due to magnitude error')
  }
  if (isFloatEqual(m as number, 0)) {
    return Error('Cannot divide by magnitude zero')
  }
  return a.map((v) => v / (m as number)) as Tuple
}

export function dot(a: Tuple, b: Tuple): Result<number> {
  return zip(a, b)
    .map(([a, b]) => a * b)
    .reduce((acc, v) => acc + v, 0) as number
}

export function cross(a: Tuple, b: Tuple): Result<Tuple> {
  const [ax, ay, az] = a
  const [bx, by, bz] = b
  return vector(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx)
}

export function hadamardProduct(c1: Color, c2: Color): Result<Color> {
  const [ar, ag, ab] = c1
  const [br, bg, bb] = c2
  const r = ar * br
  const g = ag * bg
  const b = ab * bb
  return color(r, g, b)
}
