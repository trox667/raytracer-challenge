import { position, ray, transform } from './rays'
import { point, vector } from './tuples'
import { isEqual as isTupleEqual } from './tuples'
import { scaling, translation } from './transformations'

describe('Rays', () => {
  it('Creating and querying a ray', () => {
    const origin = point(1, 2, 3)
    const direction = vector(4, 5, 6)
    const r = ray(origin, direction)
    expect(isTupleEqual(r.origin, origin)).toBeTruthy()
    expect(isTupleEqual(r.direction, direction)).toBeTruthy()
  })

  it('Computing a point from a distance', () => {
    const r = ray(point(2, 3, 4), vector(1, 0, 0))
    expect(isTupleEqual(position(r, 0), point(2, 3, 4)))
    expect(isTupleEqual(position(r, 1), point(3, 3, 4)))
    expect(isTupleEqual(position(r, -1), point(1, 3, 4)))
    expect(isTupleEqual(position(r, 2.5), point(4.5, 3, 4)))
  })

  it('Translating a ray', () => {
    const r = ray(point(1, 2, 3), vector(0, 1, 0))
    const m = translation(3, 4, 5)
    const r2 = transform(r, m)
    expect(isTupleEqual(r2.origin, point(4, 6, 8))).toBeTruthy()
    expect(isTupleEqual(r2.direction, vector(0, 1, 0))).toBeTruthy()
  })

  it('Scaling a ray', () => {
    const r = ray(point(1, 2, 3), vector(0, 1, 0))
    const m = scaling(2, 3, 4)
    const r2 = transform(r, m)
    expect(isTupleEqual(r2.origin, point(2, 6, 12))).toBeTruthy()
    expect(isTupleEqual(r2.direction, vector(0, 3, 0))).toBeTruthy()
  })
})
