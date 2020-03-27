const EPSILON = 0.0001

export const compareFloat = (a: number, b: number) => Math.abs(a - b) < EPSILON

export const rangeZero = (count: number) => [...Array(count).keys()]

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export const isOdd = (value: number) => value % 2

export const toRadians = (deg: number) => deg / 180 * Math.PI

export const toDeg = (rad: number) => rad * 180 / Math.PI