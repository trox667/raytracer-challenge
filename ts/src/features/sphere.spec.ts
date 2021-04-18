import { vector, point } from './tuples'
import { ray } from './rays'
import { isEqual as isFloatEqual } from '../util'
import { intersect, sphere } from './sphere'

describe('Spheres', () => {
  it('A ray intersects a sphere at two points', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1))
    const s = sphere()
    const xs = intersect(s, r)
    expect(xs.length).toBe(2)
    expect(isFloatEqual(xs[0], 4.0)).toBeTruthy()
    expect(isFloatEqual(xs[1], 6.0)).toBeTruthy()
  })

  it('A ray intersects a sphere at a tangent', () => {
    const r = ray(point(0, 1, -5), vector(0, 0, 1))
    const s = sphere()
    const xs = intersect(s, r)
    expect(xs.length).toBe(2)
    expect(isFloatEqual(xs[0], 5.0)).toBeTruthy()
    expect(isFloatEqual(xs[1], 5.0)).toBeTruthy()
  })

  it('A ray misses a sphere', () => {
    const r = ray(point(0, 2, -5), vector(0, 0, 1))
    const s = sphere()
    const xs = intersect(s, r)
    expect(xs.length).toBe(0)
  })

  it('A ray originates inside a sphere', () => {
    const r = ray(point(0, 0, 0), vector(0, 0, 1))
    const s = sphere()
    const xs = intersect(s, r)
    expect(xs.length).toBe(2)
    expect(isFloatEqual(xs[0], -1.0)).toBeTruthy()
    expect(isFloatEqual(xs[1], 1.0)).toBeTruthy()
  })

  it('A sphere is behind a ray', () => {
    const r = ray(point(0, 0, 5), vector(0, 0, 1))
    const s = sphere()
    const xs = intersect(s, r)
    expect(xs.length).toBe(2)
    expect(isFloatEqual(xs[0], -6.0)).toBeTruthy()
    expect(isFloatEqual(xs[1], -4.0)).toBeTruthy()
  })
})
