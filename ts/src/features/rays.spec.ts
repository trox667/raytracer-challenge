import { ray, position, sphere, intersect, intersection, intersections } from './rays'
import { point, vector, compare } from './tuples'

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
  expect(xs[0]).toBeCloseTo(4)
  expect(xs[1]).toBeCloseTo(6)
})

test('a ray intersects a sphere at a tangent', () => {
  const r = ray(point(0, 1, -5), vector(0, 0, 1))
  const s = sphere()
  const xs = intersect(s, r)
  expect(xs.length).toBe(2)
  expect(xs[0]).toBeCloseTo(5)
  expect(xs[1]).toBeCloseTo(5)
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
  expect(xs[0]).toBeCloseTo(-1)
  expect(xs[1]).toBeCloseTo(1)
})

test('a sphere is behind a ray', () => {
  const r = ray(point(0, 0, 5), vector(0, 0, 1))
  const s = sphere()
  const xs = intersect(s, r)
  expect(xs.length).toBe(2)
  expect(xs[0]).toBeCloseTo(-6)
  expect(xs[1]).toBeCloseTo(-4)
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