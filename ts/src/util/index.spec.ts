import {
  compareFloat,
  rangeZero,
  clamp,
  isOdd,
  toRadians,
  toDeg,
} from './index'

test('compare float which should be equal', () => {
  const a = 0.003
  const b = 0.0031
  expect(compareFloat(a, b)).toBeTruthy()
})

test('compare float which should not be equal', () => {
  const a = 0.003
  const b = 0.002
  expect(compareFloat(a, b)).toBeFalsy()
})

test('rangeZero to 5 contains [0,1,2,3,4]', () => {
  const a = rangeZero(5)
  const r = [0, 1, 2, 3, 4]
  const n = [1, 2, 3, 4, 5]
  expect(a).toEqual(r)
  expect(a).not.toEqual(n)
})

test('clamp 256 to 255', () => {
  expect(clamp(256, 0, 255)).toBe(255)
})

test('clamp -2 to 0', () => {
  expect(clamp(-2, 0, 255)).toBe(0)
})

test('isOdd', () => {
  expect(isOdd(1)).toBeTruthy()
  expect(isOdd(2)).toBeFalsy()
})

test('45deg is PI/4', () => {
  const deg = 45
  const r = Math.PI / 4
  expect(compareFloat(toRadians(deg), r)).toBeTruthy()
})

test('90deg is PI/2', () => {
  const deg = 90
  const r = Math.PI / 2
  expect(compareFloat(toRadians(deg), r)).toBeTruthy()
})

test('270deg is 1.5 * PI', () => {
  const deg = 270
  const r = Math.PI * 1.5
  expect(compareFloat(toRadians(deg), r)).toBeTruthy()
})

test('PI/4 is 45deg', () => {
  const rad = Math.PI / 4
  const r = 45
  expect(compareFloat(toDeg(rad), r)).toBeTruthy()
})

test('PI/2 is 90deg', () => {
  const rad = Math.PI / 2
  const r = 90
  expect(compareFloat(toDeg(rad), r)).toBeTruthy()
})

test('1.5 * PI is 270deg', () => {
  const rad = Math.PI * 1.5
  const r = 270
  expect(compareFloat(toDeg(rad), r)).toBeTruthy()
})
