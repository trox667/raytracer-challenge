import { isOk, unwrap } from '../util'
import { canvas, pixelAt, writePixel } from './canvas'
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
})
