import { color, point, vector, compare as compareTuples } from './tuples'
import { pointLight, material, setColor, lighting } from './lights'
import { sphere } from './rays'

test('a point light has a position and intensity', () => {
  const intensity = color(1, 1, 1)
  const position = point(0, 0, 0)
  const light = pointLight(position, intensity)
  expect(light.position).toEqual(position)
  expect(light.intensity).toEqual(intensity)
})

test('the default material', () => {
  const m = material()
  expect(m.ambient).toBeCloseTo(0.1)
  expect(m.diffuse).toBeCloseTo(0.9)
  expect(m.specular).toBeCloseTo(0.9)
  expect(m.shininess).toBeCloseTo(200.0)
})

test('a sphere has a default material', () => {
  const s = sphere()
  const m = s.material
  expect(m).toEqual(s.material)
})

test('a sphere may be assigned a material', () => {
  let s = sphere()
  let m = material()
  m.ambient = 1
  s.material = m
  expect(s.material).toEqual(m)
})

const background = () => {
  return {m: material(), position: point(0, 0, 0)}
}

test('lighting with the eye between the light and the surface', () => {
  const {m, position} = background()
  const eyev = vector(0, 0, -1)
  const normalv = vector(0, 0, -1)
  const light = pointLight(point(0, 0, -10), color(1, 1, 1))
  const r = lighting(m, light, position, eyev, normalv)
  const res = color(1.9, 1.9, 1.9)
  expect(compareTuples(r, res)).toBeTruthy()
})

test('lighting with the eye between light and surface, eye offset 45°', () => {
  const {m, position} = background()
  const eyev = vector(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2)
  const normalv = vector(0, 0, -1)
  const light = pointLight(point(0, 0, -10), color(1, 1, 1))
  const r = lighting(m, light, position, eyev, normalv)
  const res = color(1, 1, 1)
  expect(compareTuples(r, res)).toBeTruthy()
})

test('lighting with eye opposite surface, light offset 45°', () => {
  const {m, position} = background()
  const eyev = vector(0, 0, -1)
  const normalv = vector(0, 0, -1)
  const light = pointLight(point(0, 10, -10), color(1, 1, 1))
  const r = lighting(m, light, position, eyev, normalv)
  const res = color(0.7364, 0.7364, 0.7364)
  expect(compareTuples(r, res)).toBeTruthy()
})

test('lighting with eye in the path of the reflection vector', () => {
  const {m, position} = background()
  const eyev = vector(0, -Math.sqrt(2) / 2, -Math.sqrt(2) / 2)
  const normalv = vector(0, 0, -1)
  const light = pointLight(point(0, 10, -10), color(1, 1, 1))
  const r = lighting(m, light, position, eyev, normalv)
  const res = color(1.6364, 1.6364, 1.6364)
  expect(compareTuples(r, res)).toBeTruthy()
})

test('lighting with the light behind the surface', () => {
  const {m, position} = background()
  const eyev = vector(0, 0, -1)
  const normalv = vector(0, 0, -1)
  const light = pointLight(point(0, 0, 10), color(1, 1, 1))
  const r = lighting(m, light, position, eyev, normalv)
  const res = color(0.1, 0.1, 0.1)
  expect(compareTuples(r, res)).toBeTruthy()
})
