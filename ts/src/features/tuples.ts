import { compareFloat } from '../util/'

export interface Tuple {
  x: number
  y: number
  z: number
  w: number
}
export const point = (x: number, y: number, z: number): Tuple =>
  tuple(x, y, z, 1.0)

export const vector = (x: number, y: number, z: number): Tuple =>
  tuple(x, y, z, 0.0)

export const tuple = (x: number, y: number, z: number, w: number): Tuple => {
  return { x, y, z, w }
}

export const isPoint = (tuple: Tuple) => compareFloat(tuple.w, 1.0)
export const isVector = (tuple: Tuple) => !isPoint(tuple)

export const compare = (a: Tuple, b: Tuple) =>
  compareFloat(a.x, b.x) &&
  compareFloat(a.y, b.y) &&
  compareFloat(a.z, b.z) &&
  compareFloat(a.w, b.w)

export const add = (a: Tuple, b: Tuple) =>
  tuple(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w)

export const sub = (a: Tuple, b: Tuple) =>
  tuple(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w)

export const negate = (a: Tuple) => sub(vector(0, 0, 0), a)

export const multiplyScalar = (a: Tuple, s: number) =>
  tuple(a.x * s, a.y * s, a.z * s, a.w * s)

export const divideScalar = (a: Tuple, s: number) =>
  tuple(a.x / s, a.y / s, a.z / s, a.w / s)

export const magnitude = (a: Tuple) =>
  Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w)

export const length = (a: Tuple) => magnitude(a)

export const normalize = (a: Tuple) => {
  const l = length(a)
  return tuple(a.x / l, a.y / l, a.z / l, a.w / l)
}

export const dot = (a: Tuple, b: Tuple) =>
  a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w

export const cross = (a: Tuple, b: Tuple) =>
  vector(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x)
