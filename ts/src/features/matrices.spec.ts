import { identityMatrix4x4, Matrix2x2, Matrix3x3, Matrix4x4 } from './matrices'
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

  it('Multiplying a matrix by the identity matrix', () => {
    const a = new Matrix4x4(0, 1, 2, 4, 1, 2, 4, 8, 2, 4, 8, 16, 4, 8, 16, 32)
    const identity = identityMatrix4x4()
    expect(a.mul(identity).equal(a)).toBeTruthy()
    const b = tuple4(1, 2, 3, 4)
    expect(isTupleEqual(identity.mulVec(b), b)).toBeTruthy()
  })

  it('Transposing a matrix', () => {
    const a = new Matrix4x4(0, 9, 3, 0, 9, 8, 0, 8, 1, 8, 5, 3, 0, 0, 5, 8)
    const t = new Matrix4x4(0, 9, 1, 0, 9, 8, 8, 0, 3, 0, 5, 5, 0, 8, 3, 8)
    expect(a.transpose().equal(t)).toBeTruthy()
  })

  it('Transposing the identity matrix', () => {
    const identity = identityMatrix4x4()
    const a = identity.transpose()
    expect(a.equal(identity)).toBeTruthy()
  })

  it('Calculating the determinant of a 2x2 matrix', () => {
    const a = new Matrix2x2(1, 5, -3, 2)
    expect(a.determinant()).toBe(17)
  })

  it('A submatrix of a 3x3 matrix is a 2x2 matrix', () => {
    const a = new Matrix3x3(1, 5, 0, -3, 2, 7, 0, 6, -3)
    const b = new Matrix2x2(-3, 2, 0, 6)
    expect(a.submatrix(0, 2).equal(b)).toBeTruthy()
  })

  it('A submatrix of a 4x4 matrix is a 3x3 matrix', () => {
    const a = new Matrix4x4(-6, 1, 1, 6, -8, 5, 8, 6, -1, 0, 8, 2, -7, 1, -1, 1)
    const b = new Matrix3x3(-6, 1, 6, -8, 8, 6, -7, -1, 1)
    expect(a.submatrix(2, 1).equal(b)).toBeTruthy()
  })

  it('Calculating a minor of a 3x3 matrix', () => {
    const a = new Matrix3x3(3,5,0,2,-1,-7,6,-1,5)
    const b = a.submatrix(1,0)
    expect(b.determinant()).toBe(25)
    expect(a.minor(1,0)).toBe(25)
  })

  it('Calculating a cofactor of a 3x3 matrix', () => {
    const a = new Matrix3x3(3,5,0, 2, -1, -7, 6, -1, 5)
    expect(a.minor(0,0)).toBe(-12)
    expect(a.cofactor(0,0)).toBe(-12)
    expect(a.minor(1,0)).toBe(25)
  })
})
