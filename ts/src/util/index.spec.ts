import { compareFloat, rangeZero, clamp } from './index'

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
  const r = [0,1,2,3,4]
  const n = [1,2,3,4,5]
  expect(a).toEqual(r)
  expect(a).not.toEqual(n)
})

test('clamp 256 to 255', () => {
  expect(clamp(256, 0, 255)).toBe(255)
})

test('clamp -2 to 0', () => {
  expect(clamp(-2, 0, 255)).toBe(0)
})