import { Matrix, Matrix4x4 } from './matrices'

export function translation(x: number, y: number, z: number): Matrix4x4 {
  return new Matrix4x4(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1)
}

export function scaling(x: number, y: number, z: number): Matrix4x4 {
  return new Matrix4x4(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1)
}

export function rotationX(rad: number): Matrix4x4 {
  return new Matrix4x4(
    1,
    0,
    0,
    0,
    0,
    Math.cos(rad),
    -Math.sin(rad),
    0,
    0,
    Math.sin(rad),
    Math.cos(rad),
    0,
    0,
    0,
    0,
    1
  )
}

export function rotationY(rad: number): Matrix4x4 {
  return new Matrix4x4(
    Math.cos(rad),
    0,
    Math.sin(rad),
    0,
    0,
    1,
    0,
    0,
    -Math.sin(rad),
    0,
    Math.cos(rad),
    0,
    0,
    0,
    0,
    1
  )
}

export function rotationZ(rad: number): Matrix4x4 {
  return new Matrix4x4(
    Math.cos(rad),
    -Math.sin(rad),
    0,
    0,
    Math.sin(rad),
    Math.cos(rad),
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  )
}
