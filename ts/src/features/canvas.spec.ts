import { isOk, unwrap } from '../util'
import { canvas, canvasToPPM, pixelAt, writePixel } from './canvas'
import { color, isEqual as isTupleEqual } from './tuples'

describe('Canvas', () => {
  it('Creating a canvas', () => {
    const c = canvas(10, 20)
    const black = color(0, 0, 0)
    expect(c.width).toBe(10)
    expect(c.height).toBe(20)
    expect(c.pixels.length).toBe(10 * 20)
    for (const pixel of c.pixels) {
      expect(isTupleEqual(pixel, black)).toBeTruthy()
    }
  })

  it('Writing pixels to canvas', () => {
    const c = canvas(10, 20)
    const red = color(1, 0, 0)
    writePixel(c, 2, 3, red)
    const r = pixelAt(c, 2, 3)
    expect(isOk(r)).toBeTruthy()
    expect(isTupleEqual(unwrap(r), red)).toBeTruthy()
  })

  it('Constructing the PPM header', () => {
    const c = canvas(5, 3)
    const ppm = canvasToPPM(c)
    expect(ppm).toContain(`P3\n5 3\n255\n`)
  })

  it('Constructing the PPM pixel data', () => {
    const c = canvas(5, 3)
    const c1 = color(1.5, 0, 0)
    const c2 = color(0, 0.5, 0)
    const c3 = color(-0.5, 0, 1)
    writePixel(c, 0, 0, c1)
    writePixel(c, 2, 1, c2)
    writePixel(c, 4, 2, c3)
    const ppm = canvasToPPM(c)
    expect(ppm).toContain(
      `255 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 128 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 0 0 0 255\n`
    )
  })

  it('Splitting long lines in PPM files', () => {
    const c = canvas(10, 2)
    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < 10; x++) {
        writePixel(c, x, y, color(1, 0.8, 0.6))
      }
    }
    const ppm = canvasToPPM(c)
    const lines = ppm.split('\n')
    expect(lines[3]).toContain(
      `255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204`
    )
    expect(lines[4]).toContain(
      `153 255 204 153 255 204 153 255 204 153 255 204 153`
    )
    expect(lines[5]).toContain(
      `255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204`
    )
    expect(lines[6]).toContain(
      `153 255 204 153 255 204 153 255 204 153 255 204 153`
    )
  })

  it('PPM files are terminated by a newline character', () => {
    const c = canvas(5, 3)
    const ppm = canvasToPPM(c)
    const lines = ppm.split('\n')
    expect(lines[lines.length - 1]).toEqual('')
  })
})
