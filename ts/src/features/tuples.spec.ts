import { isPoint, isVector, point, vector, tuple, compare } from './tuples'

test('A tuple with w=1.0 is a point', () => {
  const a = point(4.3, -4.2, 3.1)
  expect(a.x).toBeCloseTo(4.3, 4)
  expect(a.y).toBeCloseTo(-4.2, 4)
  expect(a.z).toBeCloseTo(3.1, 4)
  expect(a.w).toBeCloseTo(1.0, 4)
  expect(isPoint(a)).toBeTruthy()
  expect(isVector(a)).toBeFalsy()
})

test('A tuple with w=0 is a vector', () => {
  const a = vector(4.3, -4.2, 3.1)
  expect(a.x).toBeCloseTo(4.3, 4)
  expect(a.y).toBeCloseTo(-4.2, 4)
  expect(a.z).toBeCloseTo(3.1, 4)
  expect(a.w).toBeCloseTo(0, 4)
  expect(isPoint(a)).toBeFalsy()
  expect(isVector(a)).toBeTruthy()
})

test('point() creates tuples with w=1', () => {
  const p = point(4, -4, 3)
  const r = tuple(4, -4, 3, 1)
  expect(compare(p, r)).toBeTruthy()
})

test('vector() creates tuples with w=0', () => {
  const p = vector(4, -4, 3)
  const r = tuple(4, -4, 3, 0)
  expect(compare(p, r)).toBeTruthy()
})
