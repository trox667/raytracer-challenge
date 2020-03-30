import { point, vector, compare as compareTuples, normalize } from './tuples'
import { sphere, setTransform } from './rays'
import { normalAt, reflect } from './spheres'
import { translation, scaling, rotationZ } from './transformations'
import { mul4x4 } from './matrices'

test('the normal on a sphere at a point on the x axis', () => {
  const s = sphere()
  const n = normalAt(s, point(1, 0, 0))
  const r = vector(1, 0, 0)
  expect(compareTuples(n, r)).toBeTruthy()
})

test('the normal on a sphere at a point on the y axis', () => {
  const s = sphere()
  const n = normalAt(s, point(0, 1, 0))
  const r = vector(0, 1, 0)
  expect(compareTuples(n, r)).toBeTruthy()
})

test('the normal on a sphere at a point on the z axis', () => {
  const s = sphere()
  const n = normalAt(s, point(0, 0, 1))
  const r = vector(0, 0, 1)
  expect(compareTuples(n, r)).toBeTruthy()
})

test('the normal is a normalized vector', () => {
  const s = sphere()
  const n = normalize(
    normalAt(s, point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3))
  )
  expect(n.x <= 1.0).toBeTruthy()
  expect(n.y <= 1.0).toBeTruthy()
  expect(n.z <= 1.0).toBeTruthy()
})

test('computing the normal on a translated sphere', () => {
  const s = sphere()
  setTransform(s, translation(0, 1, 0))
  const n = normalAt(s, point(0, 1.70711, -0.70711))
  const r = vector(0, 0.70711, -0.70711)
  expect(compareTuples(n, r)).toBeTruthy()
})

test('computing the normal on a transformed sphere', () => {
  const s = sphere()
  const m = mul4x4(scaling(1, 0.5, 1), rotationZ(Math.PI / 5))
  setTransform(s, m)
  const n = normalAt(s, point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2))
  const r = vector(0, 0.97014, -0.24254)
  expect(compareTuples(n, r)).toBeTruthy()
})

test('reflecting a vector approaching at 45°', () => {
  const v = vector(1, -1, 0)
  const n = vector(0, 1, 0)
  const r = reflect(v, n)
  const res = vector(1, 1, 0)
  expect(compareTuples(r, res)).toBeTruthy()
})

test('reflecting a vector off a slanted surface', () => {
  const v = vector(0, -1, 0)
  const n = vector(Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0)
  const r = reflect(v, n)
  const res = vector(1, 0, 0)
  expect(compareTuples(r, res)).toBeTruthy()
})