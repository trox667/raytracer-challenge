import {
  ray,
  position,
  sphere,
  intersect,
  intersection,
  intersections,
  hit,
  transform,
  setTransform,
} from './rays'
import { point, vector, compare } from './tuples'
import { translation, scaling } from './transformations'
import { identity4x4, compare as compareMatrix } from './matrices'

test('creating and querying a ray', () => {
  const origin = point(1, 2, 3)
  const direction = vector(4, 5, 6)
  const r = ray(origin, direction)
  expect(compare(r.origin, origin)).toBeTruthy()
  expect(compare(r.direction, direction)).toBeTruthy()
})

test('copmuting a point from a distance', () => {
  const r = ray(point(2, 3, 4), vector(1, 0, 0))
  const p1 = point(2, 3, 4)
  const p2 = point(3, 3, 4)
  const p3 = point(1, 3, 4)
  const p4 = point(4.5, 3, 4)
  expect(compare(position(r, 0), p1)).toBeTruthy()
  expect(compare(position(r, 1), p2)).toBeTruthy()
  expect(compare(position(r, -1), p3)).toBeTruthy()
  expect(compare(position(r, 2.5), p4)).toBeTruthy()
})

test('a ray intersects a sphere at two points', () => {
  const r = ray(point(0, 0, -5), vector(0, 0, 1))
  const s = sphere()
  const xs = intersect(s, r)
  expect(xs.length).toBe(2)
  expect(xs[0].t).toBeCloseTo(4)
  expect(xs[1].t).toBeCloseTo(6)
})

test('a ray intersects a sphere at a tangent', () => {
  const r = ray(point(0, 1, -5), vector(0, 0, 1))
  const s = sphere()
  const xs = intersect(s, r)
  expect(xs.length).toBe(2)
  expect(xs[0].t).toBeCloseTo(5)
  expect(xs[1].t).toBeCloseTo(5)
})

test('a ray misses a sphere', () => {
  const r = ray(point(0, 2, -5), vector(0, 0, 1))
  const s = sphere()
  const xs = intersect(s, r)
  expect(xs.length).toBe(0)
})

test('a ray originates inside a sphere', () => {
  const r = ray(point(0, 0, 0), vector(0, 0, 1))
  const s = sphere()
  const xs = intersect(s, r)
  expect(xs.length).toBe(2)
  expect(xs[0].t).toBeCloseTo(-1)
  expect(xs[1].t).toBeCloseTo(1)
})

test('a sphere is behind a ray', () => {
  const r = ray(point(0, 0, 5), vector(0, 0, 1))
  const s = sphere()
  const xs = intersect(s, r)
  expect(xs.length).toBe(2)
  expect(xs[0].t).toBeCloseTo(-6)
  expect(xs[1].t).toBeCloseTo(-4)
})

test('an intersection encapsulates t and object', () => {
  const s = sphere()
  const i = intersection(3.5, s)
  expect(i.t).toBeCloseTo(3.5)
  expect(i.object).toEqual(s)
})

test('aggregating intersections', () => {
  const s = sphere()
  const i1 = intersection(1, s)
  const i2 = intersection(2, s)
  const xs = intersections(i1, i2)
  expect(xs.length).toBe(2)
  expect(xs[0].t).toBeCloseTo(1)
  expect(xs[1].t).toBeCloseTo(2)
})

test('Intersect sets the object on the intersection', () => {
  const r = ray(point(0, 0, -5), vector(0, 0, 1))
  const s = sphere()
  const xs = intersect(s, r)
  expect(xs.length).toBe(2)
  expect(xs[0].object).toEqual(s)
  expect(xs[1].object).toEqual(s)
})

test('the hit, when all intersections have positive t', () => {
  const s = sphere()
  const i1 = intersection(1, s)
  const i2 = intersection(2, s)
  const xs = intersections(i2, i1)
  const i = hit(xs)
  expect(i).toEqual(i1)
})

test('the hit, when some intersections have negative t', () => {
  const s = sphere()
  const i1 = intersection(-1, s)
  const i2 = intersection(1, s)
  const xs = intersections(i2, i1)
  const i = hit(xs)
  expect(i).toEqual(i2)
})

test('the hit, when all intersections have negative t', () => {
  const s = sphere()
  const i1 = intersection(-2, s)
  const i2 = intersection(-1, s)
  const xs = intersections(i2, i1)
  const i = hit(xs)
  expect(i).toBeNull()
})

test('the hit is always the lowest nonnegative intersection', () => {
  const s = sphere()
  const i1 = intersection(5, s)
  const i2 = intersection(7, s)
  const i3 = intersection(-3, s)
  const i4 = intersection(2, s)
  const xs = intersections(i1, i2, i3, i4)
  const i = hit(xs)
  expect(i).toEqual(i4)
})

test('translating a ray', () => {
  const r = ray(point(1, 2, 3), vector(0, 1, 0))
  const m = translation(3, 4, 5)
  const r2 = transform(r, m)
  const ro = point(4, 6, 8)
  const rd = vector(0, 1, 0)
  expect(compare(r2.origin, ro)).toBeTruthy()
  expect(compare(r2.direction, rd)).toBeTruthy()
})

test('scaling a ray', () => {
  const r = ray(point(1, 2, 3), vector(0, 1, 0))
  const m = scaling(2, 3, 4)
  const r2 = transform(r, m)
  const ro = point(2, 6, 12)
  const rd = vector(0, 3, 0)
  expect(compare(r2.origin, ro)).toBeTruthy()
  expect(compare(r2.direction, rd)).toBeTruthy()
})

test('a spheres default transformation', () => {
  const s = sphere()
  expect(compareMatrix(s.transform, identity4x4())).toBeTruthy()
})

test('changing a spheres transformation', () => {
  const s = sphere()
  const t = translation(2, 3, 4)
  setTransform(s, t)
  expect(compareMatrix(s.transform, t)).toBeTruthy()
})

test('intersecting a scaled sphere with a ray', () => {
  const r = ray(point(0, 0, -5), vector(0, 0, 1))
  const s = sphere()
  setTransform(s, scaling(2, 2, 2))
  const xs = intersect(s, r)
  expect(xs.length).toBe(2)
  expect(xs[0].t).toBeCloseTo(3)
  expect(xs[1].t).toBeCloseTo(7)
})

test('intersecting a translated sphere with a ray', () => {
  const r = ray(point(0, 0, -5), vector(0, 0, 1))
  const s = sphere()
  setTransform(s, translation(5, 0, 0))
  const xs = intersect(s, r)
  expect(xs.length).toBe(0)
})
