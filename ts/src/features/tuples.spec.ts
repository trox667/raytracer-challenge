import {
  isPoint,
  isVector,
  point,
  vector,
  tuple,
  compare,
  add,
  sub,
  negate,
  multiplyScalar,
  divideScalar,
  magnitude,
  normalize,
  dot,
  cross,
} from './tuples'
import { compareFloat } from '../util'

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

test('adding two tuples', () => {
  const a1 = point(3, -2, 5)
  const a2 = vector(-2, 3, 1)
  const r = tuple(1, 1, 6, 1)
  expect(compare(r, add(a1, a2))).toBeTruthy()
})

test('subtracting two vectors', () => {
  const v1 = vector(3, 2, 1)
  const v2 = vector(5, 6, 7)
  const r = vector(-2, -4, -6)
  expect(compare(r, sub(v1, v2))).toBeTruthy()
})

test('subtracting a vector from the zero vector', () => {
  const v = vector(1, -2, 3)
  const r = vector(-1, 2, -3)
  expect(compare(negate(v), r)).toBeTruthy()
})

test('negating a tuple', () => {
  const a = tuple(1, -2, 3, -4)
  const r = tuple(-1, 2, -3, 4)
  expect(compare(negate(a), r)).toBeTruthy()
})

test('multiplying a tuple by a scalar', () => {
  const a = tuple(1, -2, 3, -4)
  const r = tuple(3.5, -7, 10.5, -14)
  expect(compare(multiplyScalar(a, 3.5), r)).toBeTruthy()
})

test('mutiplying a tuple by a fraction', () => {
  const a = tuple(1, -2, 3, -4)
  const r = tuple(0.5, -1, 1.5, -2)
  expect(compare(multiplyScalar(a, 0.5), r)).toBeTruthy()
})

test('dividing a tuple by a scalar', () => {
  const a = tuple(1, -2, 3, -4)
  const r = tuple(0.5, -1, 1.5, -2)
  expect(compare(divideScalar(a, 2), r)).toBeTruthy()
})

test('computing the magnitude of vector(1,0,0)', () => {
  const v = vector(1, 0, 0)
  const r = 1
  expect(compareFloat(magnitude(v), r)).toBeTruthy()
})

test('computing the magnitude of vector(0,1,0)', () => {
  const v = vector(0, 1, 0)
  const r = 1
  expect(compareFloat(magnitude(v), r)).toBeTruthy()
})

test('computing the magnitude of vector(0, 0, 1)', () => {
  const v = vector(0, 0, 1)
  const r = 1
  expect(compareFloat(magnitude(v), r)).toBeTruthy()
})

test('computing the magnitude of vector(1,2,3)', () => {
  const v = vector(1, 2, 3)
  const r = Math.sqrt(14)
  expect(compareFloat(magnitude(v), r)).toBeTruthy()
})

test('computing the magnitude of vector(-1,-2,-3)', () => {
  const v = vector(-1, -2, -3)
  const r = Math.sqrt(14)
  expect(compareFloat(magnitude(v), r)).toBeTruthy()
})

test('normalizing vector(4,0,0) gives (1,0,0)', () => {
  const v = vector(4, 0, 0)
  const r = vector(1, 0, 0)
  expect(compare(normalize(v), r)).toBeTruthy()
})

test('normalizing vector(1,2,3)', () => {
  const v = vector(1, 2, 3)
  const r = vector(0.26726, 0.53452, 0.80178)
  expect(compare(normalize(v), r)).toBeTruthy()
})

test('the magnitude of a normalized vector', () => {
  const v = vector(1, 2, 3)
  const r = 1
  expect(compareFloat(magnitude(normalize(v)), r)).toBeTruthy()
})

test('the dot product of two tuples', () => {
  const a = vector(1, 2, 3)
  const b = vector(2, 3, 4)
  const r = 20
  expect(compareFloat(dot(a, b), 20)).toBeTruthy()
})

test('the cross product of two vectors', () => {
  const a = vector(1, 2, 3)
  const b = vector(2, 3, 4)
  const r1 = vector(-1, 2, -1)
  const r2 = vector(1, -2, 1)
  expect(compare(cross(a,b), r1)).toBeTruthy()
  expect(compare(cross(b,a), r2)).toBeTruthy()
})
