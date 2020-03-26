import { point, compare as compareTuples, vector } from './tuples'
import { inverse, transform4 } from './matrices'
import { translation } from "./transformations";

test('multiplying by a translation matrix', () => {
  const transform = translation(5, -3, 2)
  const p = point(-3, 4, 5)
  const r = point(2, 1, 7)
  expect(compareTuples(transform4(transform, p), r)).toBeTruthy()
})

test('multiplying by the inverse of a translation matrix', () => {
  const transform = translation(5, -3, 2)
  const inv = inverse(transform)
  const p = point(-3, 4, 5)
  const r = point(-8, 7, 3)
  expect(compareTuples(transform4(inv, p), r)).toBeTruthy()
})

test('translation does not affect vectors', () => {
  const transform = translation(5, -3, 2)
  const v = vector(-3, 4, 5)
  expect(compareTuples(transform4(transform, v), v)).toBeTruthy()
})
