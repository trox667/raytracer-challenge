const EPSILON = 0.0001

export const compareFloat = (a: number, b: number) => Math.abs(a - b) < EPSILON

export const rangeZero = (count: number) => [...Array(count).keys()]

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)
