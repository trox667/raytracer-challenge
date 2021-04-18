import { intersect, sphere } from './sphere'
import { isEqual as isFloatEqual } from '../util'
import { hit, intersection, intersections } from './intersections'
import { point, vector } from './tuples'
import { ray } from './rays'

describe('Intersections', () => {
  it('An intersection encapsulates t and object', () => {
    const s = sphere()
    const i = intersection(3.5, s)
    expect(isFloatEqual(i.t, 3.5)).toBeTruthy()
    expect(i.object).toBe(s)
  })

  it('Aggregating intersections', () => {
    const s = sphere()
    const i1 = intersection(1, s)
    const i2 = intersection(2, s)
    const xs = intersections([i1, i2])
    expect(xs.length).toBe(2)
    expect(isFloatEqual(xs[0].t, 1)).toBeTruthy()
    expect(isFloatEqual(xs[1].t, 2)).toBeTruthy()
  })

  it('Intersect sets the object on the intersection', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1))
    const s = sphere()
    const xs = intersect(s, r)
    expect(xs.length).toBe(2)
    expect(xs[0].object).toBe(s)
    expect(xs[1].object).toBe(s)
  })

  it('The hit, when all intersections have positive t', () => {
    const s = sphere()
    const i1 = intersection(1, s)
    const i2 = intersection(2, s)
    const xs = intersections([i2, i1])
    const i = hit(xs)
    expect(i).toEqual(i1)
  })

  it('The hit, when some intersections have negative t', () => {
    const s = sphere()
    const i1 = intersection(-1, s)
    const i2 = intersection(1, s)
    const xs = intersections([i2, i1])
    const i = hit(xs)
    expect(i).toEqual(i2)
  })

  it('The hit, when all intersections have negative t', () => {
    const s = sphere()
    const i1 = intersection(-2, s)
    const i2 = intersection(-1, s)
    const xs = intersections([i2, i1])
    const i = hit(xs)
    expect(i).toBeNull()
  })

  it('The hit is always the lowest nonnegative intersection', () => {
    const s = sphere()
    const i1 = intersection(5, s)
    const i2 = intersection(7, s)
    const i3 = intersection(-3, s)
    const i4 = intersection(2, s)
    const xs = intersections([i1, i2, i3, i4])
    const i = hit(xs)
    expect(i).toEqual(i4)
  })
})
