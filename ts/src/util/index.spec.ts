import { compareFloat } from './index'

test('compare float which should be equal', () => {
  const a = 0.003
  const b = 0.0031
  expect(compareFloat(a, b)).toBeTruthy()
})

test('compare float which should not be equal', () => {
  const a = 0.003
  const b = 0.002
  expect(compareFloat(a, b)).toBeFalsy()
})
