import { Matrix2x2, Matrix3x3, Matrix4x4 } from './matrices'
import { isEqual as isTupleEqual, tuple4 } from './tuples'

describe('Matrix', () => {
  it('Constructing and inspecting a 4x4 matrix', () => {
    const m = new Matrix4x4(
      1,
      2,
      3,
      4,
      5.5,
      6.5,
      7.5,
      8.5,
      9,
      10,
      11,
      12,
      13.5,
      14.5,
      15.5,
      16.5
    )
    expect(m.at(0, 0)).toBe(1)
    expect(m.at(0, 3)).toBe(4)
    expect(m.at(1, 0)).toBe(5.5)
    expect(m.at(1, 2)).toBe(7.5)
    expect(m.at(2, 2)).toBe(11)
    expect(m.at(3, 0)).toBe(13.5)
    expect(m.at(3, 2)).toBe(15.5)
  })

  it('A 2x2 matrix ought to be representable', () => {
    const m = new Matrix2x2(-3, 5, 1, -2)
    expect(m.at(0, 0)).toBe(-3)
    expect(m.at(0, 1)).toBe(5)
    expect(m.at(1, 0)).toBe(1)
    expect(m.at(1, 1)).toBe(-2)
  })

  it('A 3x3 matrix ought to be representable', () => {
    const m = new Matrix3x3(-3, 5, 0, 1, -2, -7, 0, 1, 1)
    expect(m.at(0, 0)).toBe(-3)
    expect(m.at(1, 1)).toBe(-2)
    expect(m.at(2, 2)).toBe(1)
  })

  it('Matrix equality with identical matrices', () => {
    const a = new Matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2)
    const b = new Matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2)
    expect(a.equal(b)).toBeTruthy
  })

  it('Matrix equality with different matrices', () => {
    const a = new Matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2)
    const b = new Matrix4x4(2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1)
    expect(a.equal(b)).toBeFalsy()
  })

  it('Multiplying two matrices', () => {
    const a = new Matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2)
    const b = new Matrix4x4(-2, 1, 2, 3, 3, 2, 1, -1, 4, 3, 6, 5, 1, 2, 7, 8)
    const t = new Matrix4x4(
      20,
      22,
      50,
      48,
      44,
      54,
      114,
      108,
      40,
      58,
      110,
      102,
      16,
      26,
      46,
      42
    )
    expect(a.mul(b).equal(t)).toBeTruthy()
  })

  it('A matrix multiplied by a tuple', () => {
    const a = new Matrix4x4(1, 2, 3, 4, 2, 4, 4, 2, 8, 6, 4, 1, 0, 0, 0, 1)
    const b = tuple4(1, 2, 3, 1)
    const t = tuple4(18, 24, 33, 1)
    expect(isTupleEqual(a.mulVec(b), t)).toBeTruthy()
  })
})
