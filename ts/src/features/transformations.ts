import { Matrix4x4 } from './matrices'

export function translation(x: number, y: number, z: number): Matrix4x4 {
  return new Matrix4x4(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1)
}

export function scaling(x: number, y: number, z: number): Matrix4x4 {
  return new Matrix4x4(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1)
}
