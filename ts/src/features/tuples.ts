import { isEqual as isFloatEqual, isOk, zip } from '../util'

export type Tuple = [number, number, number, number] | [number, number, number]
export type Vector = Tuple
export type Point = Tuple
export type Color = Tuple

export function isEqual(a: Tuple, b: Tuple): boolean {
  return zip(a, b).every(([a, b]) => isFloatEqual(a, b))
}

export function tuple4(x: number, y: number, z: number, w: number): Tuple {
  return [x, y, z, w]
}

export function tuple3(x: number, y: number, z: number): Tuple {
  return [x, y, z]
}

export function point(x: number, y: number, z: number): Point {
  return tuple4(x, y, z, 1.0)
}

export function vector(x: number, y: number, z: number): Vector {
  return tuple4(x, y, z, 0.0)
}

export function color(r: number, g: number, b: number): Color {
  return tuple3(r, g, b)
}

export function isPoint(t: Tuple): boolean {
  const w = t[3]
  return isFloatEqual(w, 1.0)
}

export function isVector(t: Tuple): boolean {
  const w = t[3]
  return isFloatEqual(w, 0.0)
}

export function add(a: Tuple, b: Tuple): Tuple {
  if (a[3] + b[3] > 1.0) {
    throw Error('Cannot add two points')
  }
  return zip(a, b).map(([a, b]) => a + b) as Tuple
}

export function sub(a: Tuple, b: Tuple): Tuple {
  switch (a.length) {
    case 3:
      return sub3(a, b)
    case 4:
      return sub4(a, b)
    default:
      throw Error(
        'Cannot subtract, only Tuples of length 3 or 4 are supported'
      )
  }
}

export function sub4(a: Tuple, b: Tuple): Tuple {
  const [ax, ay, az, aw] = a
  const [bx, by, bz, bw] = b
  if (aw - bw <= -1.0) {
    throw Error('Cannot subtract a point from a vector')
  }
  return [ax - bx, ay - by, az - bz, aw - bw]
}

export function sub3(a: Tuple, b: Tuple): Tuple {
  if (a.length !== 3 || b.length !== 3)
    throw Error('Cannot subtract, values are not length=3')
  const [ax, ay, az] = a
  const [bx, by, bz] = b
  return [ax - bx, ay - by, az - bz]
}

export function negate(a: Tuple): Tuple {
  const zero: Tuple = [0, 0, 0, 0]
  return sub(zero, a)
}

export function mulScalar(a: Tuple, b: number): Tuple {
  return a.map((v) => v * b) as Tuple
}

export function divScalar(a: Tuple, b: number): Tuple {
  if (isFloatEqual(b, 0)) {
    throw Error('Cannot divide by zero')
  }
  return mulScalar(a, 1 / b)
}

export function magnitude(a: Tuple): number {
  const [x, y, z] = a
  return Math.sqrt(x * x + y * y + z * z)
}

export function normalize(a: Tuple): Tuple {
  const m = magnitude(a)
  if (!isOk(m)) {
    throw Error('Cannot normalize due to magnitude error')
  }
  if (isFloatEqual(m as number, 0)) {
    throw Error('Cannot divide by magnitude zero')
  }
  return a.map((v) => v / (m as number)) as Tuple
}

export function dot(a: Tuple, b: Tuple): number {
  return zip(a, b)
    .map(([a, b]) => a * b)
    .reduce((acc, v) => acc + v, 0) as number
}

export function cross(a: Tuple, b: Tuple): Tuple {
  const [ax, ay, az] = a
  const [bx, by, bz] = b
  return vector(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx)
}

export function hadamardProduct(c1: Color, c2: Color): Color {
  const [ar, ag, ab] = c1
  const [br, bg, bb] = c2
  const r = ar * br
  const g = ag * bg
  const b = ab * bb
  return color(r, g, b)
}
