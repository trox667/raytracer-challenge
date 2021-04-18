import { position, ray } from './rays'
import { point, vector } from './tuples'
import { isEqual as isTupleEqual } from './tuples'

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
})
