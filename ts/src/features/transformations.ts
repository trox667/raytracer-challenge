import { Matrix, identity4x4, transform4 } from './matrices'

export const translation = (x: number, y: number, z: number): Matrix => {
  let m = identity4x4()
  m.m[3] = x
  m.m[7] = y
  m.m[11] = z
  return m
}

export const scaling = (x: number, y: number, z: number): Matrix => {
  let m = identity4x4()
  m.m[0] = x
  m.m[5] = y
  m.m[10] = z
  return m
}

export const rotationX = (rad: number): Matrix => {
  let m = identity4x4()
  m.m[5] = Math.cos(rad)
  m.m[6] = -Math.sin(rad)
  m.m[9] = Math.sin(rad)
  m.m[10] = Math.cos(rad)
  return m
}

export const rotationY = (rad: number): Matrix => {
  let m = identity4x4()
  m.m[0] = Math.cos(rad)
  m.m[2] = Math.sin(rad)
  m.m[8] = -Math.sin(rad)
  m.m[10] = Math.cos(rad)
  return m
}

export const rotationZ = (rad: number): Matrix => {
  let m = identity4x4()
  m.m[0] = Math.cos(rad)
  m.m[1] = -Math.sin(rad)
  m.m[4] = Math.sin(rad)
  m.m[5] = Math.cos(rad)
  return m
}

export const shearing = (
  xy: number,
  xz: number,
  yx: number,
  yz: number,
  zx: number,
  zy: number
): Matrix => {
  const m = identity4x4()
  m.m[1] = xy
  m.m[2] = xz
  m.m[4] = yx
  m.m[6] = yz
  m.m[8] = zx
  m.m[9] = zy
  return m
}
