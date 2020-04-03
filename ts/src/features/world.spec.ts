import { point, color, vector } from './tuples'
import { sphere, ray } from './rays'
import { pointLight } from './lights'
import { scaling } from './transformations'
import { world, defaultWorld, intersectWorld } from './world'

test('creating a world', () => {
  const w = world()
  expect(w.objects.length).toBe(0)
  expect(w.light).toBeNull()
})

test('the default world', () => {
  const light = pointLight(point(-10, 10, -10), color(1, 1, 1))
  const s1 = sphere()
  s1.material.color = color(0.8, 1.0, 0.6)
  s1.material.diffuse = 0.7
  s1.material.specular = 0.2

  const s2 = sphere()
  s2.transform = scaling(0.5, 0.5, 0.5)

  const w = defaultWorld()

  expect(w.objects.length).toBe(2)
  expect(w.light).toEqual(light)
})

test('intersect a world with a ray', () => {
  const w = defaultWorld()
  const r = ray(point(0, 0, -5), vector(0, 0, 1))
  const xs = intersectWorld(w, r)
  expect(xs.length).toBe(4)
  expect(xs[0].t).toBe(4)
  expect(xs[1].t).toBe(4.5)
  expect(xs[2].t).toBe(5.5)
  expect(xs[3].t).toBe(6)
})
