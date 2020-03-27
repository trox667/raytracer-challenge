import { point, compare as compareTuples, vector } from './tuples'
import { inverse, transform4, mul4x4 } from './matrices'
import {
  translation,
  scaling,
  rotationX,
  rotationY,
  rotationZ,
  shearing,
} from './transformations'

test('multiplying by a translation matrix', () => {
  const transform = translation(5, -3, 2)
  const p = point(-3, 4, 5)
  const r = point(2, 1, 7)
  expect(compareTuples(transform4(transform, p), r)).toBeTruthy()
})

test('multiplying by the inverse of a translation matrix', () => {
  const transform = translation(5, -3, 2)
  const inv = inverse(transform)
  const p = point(-3, 4, 5)
  const r = point(-8, 7, 3)
  expect(compareTuples(transform4(inv, p), r)).toBeTruthy()
})

test('translation does not affect vectors', () => {
  const transform = translation(5, -3, 2)
  const v = vector(-3, 4, 5)
  expect(compareTuples(transform4(transform, v), v)).toBeTruthy()
})

test('a scaling matrix applied to a point', () => {
  const transform = scaling(2, 3, 4)
  const p = point(-4, 6, 8)
  const r = point(-8, 18, 32)
  expect(compareTuples(transform4(transform, p), r)).toBeTruthy()
})

test('a scaling matrix applied to a vector', () => {
  const transform = scaling(2, 3, 4)
  const v = vector(-4, 6, 8)
  const r = vector(-8, 18, 32)
  expect(compareTuples(transform4(transform, v), r)).toBeTruthy()
})

test('multiplying by the inverse of a scaling matrix', () => {
  const transform = scaling(2, 3, 4)
  const inv = inverse(transform)
  const v = vector(-4, 6, 8)
  const r = vector(-2, 2, 2)
  expect(compareTuples(transform4(inv, v), r)).toBeTruthy()
})

test('reflection is scaling by a negative value', () => {
  const transform = scaling(-1, 1, 1)
  const p = point(2, 3, 4)
  const r = point(-2, 3, 4)
  expect(compareTuples(transform4(transform, p), r)).toBeTruthy()
})

test('rotating a point around the x axis', () => {
  const p = point(0, 1, 0)
  const halfQuarter = rotationX(Math.PI / 4)
  const fullQuarter = rotationX(Math.PI / 2)
  const rHalfQuarter = point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2)
  const rFullQuarter = point(0, 0, 1)
  expect(compareTuples(transform4(halfQuarter, p), rHalfQuarter)).toBeTruthy()
  expect(compareTuples(transform4(fullQuarter, p), rFullQuarter)).toBeTruthy()
})

test('the inverse of an x-rotation rotates in the opposite direction', () => {
  const p = point(0, 1, 0)
  const halfQuarter = rotationX(Math.PI / 4)
  const inv = inverse(halfQuarter)
  const rHalfQuarter = point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2)
  expect(compareTuples(transform4(inv, p), rHalfQuarter)).toBeTruthy()
})

test('rotating a point around the y axis', () => {
  const p = point(0, 0, 1)
  const halfQuarter = rotationY(Math.PI / 4)
  const fullQuarter = rotationY(Math.PI / 2)
  const rHalfQuarter = point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2)
  const rFullQuarter = point(1, 0, 0)
  expect(compareTuples(transform4(halfQuarter, p), rHalfQuarter)).toBeTruthy()
  expect(compareTuples(transform4(fullQuarter, p), rFullQuarter)).toBeTruthy()
})

test('rotating a point around the z axis', () => {
  const p = point(0, 1, 0)
  const halfQuarter = rotationZ(Math.PI / 4)
  const fullQuarter = rotationZ(Math.PI / 2)
  const rHalfQuarter = point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0)
  const rFullQuarter = point(-1, 0, 0)
  expect(compareTuples(transform4(halfQuarter, p), rHalfQuarter)).toBeTruthy()
  expect(compareTuples(transform4(fullQuarter, p), rFullQuarter)).toBeTruthy()
})

test('a shearing transformation moves x in propertion to y', () => {
  const transform = shearing(1, 0, 0, 0, 0, 0)
  const p = point(2, 3, 4)
  const r = point(5, 3, 4)
  expect(compareTuples(transform4(transform, p), r)).toBeTruthy()
})

test('a shearing transformation moves x in propertion to z', () => {
  const transform = shearing(0, 1, 0, 0, 0, 0)
  const p = point(2, 3, 4)
  const r = point(6, 3, 4)
  expect(compareTuples(transform4(transform, p), r)).toBeTruthy()
})

test('a shearing transformation moves y in propertion to x', () => {
  const transform = shearing(0, 0, 1, 0, 0, 0)
  const p = point(2, 3, 4)
  const r = point(2, 5, 4)
  expect(compareTuples(transform4(transform, p), r)).toBeTruthy()
})

test('a shearing transformation moves y in propertion to z', () => {
  const transform = shearing(0, 0, 0, 1, 0, 0)
  const p = point(2, 3, 4)
  const r = point(2, 7, 4)
  expect(compareTuples(transform4(transform, p), r)).toBeTruthy()
})

test('a shearing transformation moves z in propertion to x', () => {
  const transform = shearing(0, 0, 0, 0, 1, 0)
  const p = point(2, 3, 4)
  const r = point(2, 3, 6)
  expect(compareTuples(transform4(transform, p), r)).toBeTruthy()
})

test('a shearing transformation moves z in propertion to y', () => {
  const transform = shearing(0, 0, 0, 0, 0, 1)
  const p = point(2, 3, 4)
  const r = point(2, 3, 7)
  expect(compareTuples(transform4(transform, p), r)).toBeTruthy()
})

test('individual transformations are applied in sequence', () => {
  const p = point(1, 0, 1)
  const a = rotationX(Math.PI / 2)
  const b = scaling(5, 5, 5)
  const c = translation(10, 5, 7)

  const p2 = transform4(a, p)
  const p2r = point(1, -1, 0)
  expect(compareTuples(p2, p2r)).toBeTruthy()

  const p3 = transform4(b, p2)
  const p3r = point(5, -5, 0)
  expect(compareTuples(p3, p3r)).toBeTruthy()

  const p4 = transform4(c, p3)
  const p4r = point(15, 0, 7)
  expect(compareTuples(p4, p4r)).toBeTruthy()
})

test('chained transformations must be applied in reverse order', () => {
  const p = point(1, 0, 1)
  const a = rotationX(Math.PI / 2)
  const b = scaling(5, 5, 5)
  const c = translation(10, 5, 7)
  const t = mul4x4(mul4x4(c, b), a)
  const r = point(15, 0, 7)
  expect(compareTuples(transform4(t, p), r)).toBeTruthy()
})
