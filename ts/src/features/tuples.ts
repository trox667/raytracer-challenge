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
