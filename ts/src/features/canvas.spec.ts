import { compare, color } from './tuples'
import {
  canvas,
  writePixel,
  getPixel,
  canvasToPPM,
  canvasToPPMHeader,
} from './canvas'

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

test('constructing the ppm header', () => {
  const c = canvas(5, 3)
  const r = `P3\n5 3\n255`
  expect(canvasToPPMHeader(c)).toBe(r)
})

test('constructing the ppm pixel data', () => {
  const c = canvas(5, 3)
  const c1 = color(1.5, 0, 0)
  const c2 = color(0, 0.5, 0)
  const c3 = color(-0.5, 0, 1)
  writePixel(c, 0, 0, c1)
  writePixel(c, 2, 1, c2)
  writePixel(c, 4, 2, c3)
  const r = [
    'P3',
    '5 3',
    '255',
    '255 0 0 0 0 0 0 0 0 0 0 0 0 0 0',
    '0 0 0 0 0 0 0 128 0 0 0 0 0 0 0',
    '0 0 0 0 0 0 0 0 0 0 0 0 0 0 255',
  ].join('\n')
  expect(canvasToPPM(c)).toMatch(r)
})

test('splitting long lines in PPM files', () => {
  const c = canvas(10, 2)
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 2; y++) {
      writePixel(c, x, y, color(1, 0.8, 0.6))
    }
  }
  const r = [
    'P3',
    '10 2',
    '255',
    '255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204',
    '153 255 204 153 255 204 153 255 204 153 255 204 153',
    '255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204',
    '153 255 204 153 255 204 153 255 204 153 255 204 153',
  ].join('\n')
  expect(canvasToPPM(c)).toMatch(r)
})

test('ppm files are terminated by a newline character', () => {
  const c = canvas(5, 3)
  const ppm = canvasToPPM(c)
  expect(ppm.charAt(ppm.length-1)).toMatch('\n')
})