import { compare, color } from './tuples'
import { canvas, writePixel, getPixel } from './canvas'

test('creating a canvas', () => {
  const c = canvas(10, 20)
  const black = color(0, 0, 0)
  expect(c.width).toBe(10)
  expect(c.height).toBe(20)
  c.pixel.forEach(pixel => {
    expect(compare(pixel, black)).toBeTruthy()
  })
})

test('writing pixels to a canvas', () => {
  const c = canvas(10, 20)
  const red = color(1, 0, 0)
  writePixel(c, 2, 3, red)
  expect(compare(getPixel(c, 2, 3), red)).toBeTruthy()
})
