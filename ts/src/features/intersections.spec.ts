import { intersect, sphere } from './sphere'
import { isEqual as isFloatEqual } from '../util'
import { intersection, intersections } from './intersections'
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
})
