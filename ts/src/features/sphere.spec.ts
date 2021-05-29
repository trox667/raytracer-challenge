import { vector, point, isEqual, normalize } from './tuples'
import { ray } from './rays'
import { isEqual as isFloatEqual } from '../util'
import { setTransform, intersect, sphere, normalAt } from './sphere'
import { identityMatrix4x4 } from './matrices'
import { translation, scaling, rotationZ } from './transformations'

describe('Spheres', () => {
  it('A ray intersects a sphere at two points', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1))
    const s = sphere()
    const xs = intersect(s, r)
    expect(xs.length).toBe(2)
    expect(isFloatEqual(xs[0].t, 4.0)).toBeTruthy()
    expect(isFloatEqual(xs[1].t, 6.0)).toBeTruthy()
  })

  it('A ray intersects a sphere at a tangent', () => {
    const r = ray(point(0, 1, -5), vector(0, 0, 1))
    const s = sphere()
    const xs = intersect(s, r)
    expect(xs.length).toBe(2)
    expect(isFloatEqual(xs[0].t, 5.0)).toBeTruthy()
    expect(isFloatEqual(xs[1].t, 5.0)).toBeTruthy()
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
    expect(isFloatEqual(xs[0].t, -1.0)).toBeTruthy()
    expect(isFloatEqual(xs[1].t, 1.0)).toBeTruthy()
  })

  it('A sphere is behind a ray', () => {
    const r = ray(point(0, 0, 5), vector(0, 0, 1))
    const s = sphere()
    const xs = intersect(s, r)
    expect(xs.length).toBe(2)
    expect(isFloatEqual(xs[0].t, -6.0)).toBeTruthy()
    expect(isFloatEqual(xs[1].t, -4.0)).toBeTruthy()
  })

  it("A sphere's default transformation", () => {
    const s = sphere()
    const identity = identityMatrix4x4()
    expect(s.transform.equal(identity)).toBeTruthy()
  })

  it("Changing a sphere's transformation", () => {
    const s = sphere()
    const t = translation(2, 3, 4)
    setTransform(s, t)
    expect(s.transform.equal(t)).toBeTruthy()
  })

  it('Intersecting a scaled sphere with a ray', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1))
    const s = sphere()
    setTransform(s, scaling(2, 2, 2))
    const xs = intersect(s, r)
    expect(xs.length).toBe(2)
    expect(isFloatEqual(xs[0].t, 3)).toBeTruthy()
    expect(isFloatEqual(xs[1].t, 7)).toBeTruthy()
  })

  it('Intersecting a translated sphere with a ray', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1))
    const s = sphere()
    setTransform(s, translation(5, 0, 0))
    const xs = intersect(s, r)
    expect(xs.length).toBe(0)
  })

  it('The normal on a sphere at a point on the x axis', () => {
    const s = sphere()
    const n = normalAt(s, point(1, 0, 0))
    expect(isEqual(n, vector(1, 0, 0))).toBeTruthy()
  })

  it('The normal on a sphere at a point on the y axis', () => {
    const s = sphere()
    const n = normalAt(s, point(0, 1, 0))
    expect(isEqual(n, vector(0, 1, 0))).toBeTruthy()
  })

  it('The normal on a sphere at a point on the z axis', () => {
    const s = sphere()
    const n = normalAt(s, point(0, 0, 1))
    expect(isEqual(n, vector(0, 0, 1))).toBeTruthy()
  })

  it('The normal on a sphere at a nonaxial point', () => {
    const s = sphere()
    const n = normalAt(
      s,
      point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3)
    )
    expect(
      isEqual(n, vector(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3))
    ).toBeTruthy()
  })

  it('The normal is a normalized vector', () => {
    const s = sphere()
    const n = normalAt(
      s,
      point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3)
    )
    expect(isEqual(n, normalize(n))).toBeTruthy()
  })

  it('Computing the normal on a translated sphere', () => {
    const s = sphere()
    setTransform(s, translation(0,1,0))
    const n = normalAt(s, point(0, 1.70711, -0.70711))
    expect(isEqual(n, vector(0, 0.70711, -0.70711))).toBeTruthy()
  })

  it('Computing the normal on a transformed sphere', () => {
    const s = sphere()
    const m = scaling(1, 0.5, 1).mul(rotationZ(Math.PI/5))
    setTransform(s, m)
    const n = normalAt(s, point(0, Math.sqrt(2)/2, -Math.sqrt(2)/2))
    expect(isEqual(n, vector(0, 0.97014, -0.24254))).toBeTruthy()
  })
})
