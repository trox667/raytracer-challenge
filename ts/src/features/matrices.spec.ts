import { identityMatrix4x4, Matrix2x2, Matrix3x3, Matrix4x4 } from './matrices'
import { isEqual as isTupleEqual, tuple4 } from './tuples'
import { isEqual as isFloatEqual } from '../util'

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
    const a = new Matrix3x3(3, 5, 0, 2, -1, -7, 6, -1, 5)
    const b = a.submatrix(1, 0)
    expect(b.determinant()).toBe(25)
    expect(a.minor(1, 0)).toBe(25)
  })

  it('Calculating a cofactor of a 3x3 matrix', () => {
    const a = new Matrix3x3(3, 5, 0, 2, -1, -7, 6, -1, 5)
    expect(a.minor(0, 0)).toBe(-12)
    expect(a.cofactor(0, 0)).toBe(-12)
    expect(a.minor(1, 0)).toBe(25)
  })

  it('Calculating the determinant of a 3x3 matrix', () => {
    const a = new Matrix3x3(1, 2, 6, -5, 8, -4, 2, 6, 4)
    expect(a.cofactor(0, 0)).toBe(56)
    expect(a.cofactor(0, 1)).toBe(12)
    expect(a.cofactor(0, 2)).toBe(-46)
    expect(a.determinant()).toBe(-196)
  })

  it('Calculating the determinant of a 4x4 matrix', () => {
    const a = new Matrix4x4(
      -2,
      -8,
      3,
      5,
      -3,
      1,
      7,
      3,
      1,
      2,
      -9,
      6,
      -6,
      7,
      7,
      -9
    )
    expect(a.cofactor(0, 0)).toBe(690)
    expect(a.cofactor(0, 1)).toBe(447)
    expect(a.cofactor(0, 2)).toBe(210)
    expect(a.cofactor(0, 3)).toBe(51)
    expect(a.determinant()).toBe(-4071)
  })

  it('Testing an invertible matrix for invertibility', () => {
    const a = new Matrix4x4(6, 4, 4, 4, 5, 5, 7, 6, 4, -9, 3, -7, 9, 1, 7, -6)
    expect(a.determinant()).toBe(-2120)
    expect(a.isInvertible()).toBeTruthy()
  })

  it('Testing a noninvertible matrix for invertibility', () => {
    const a = new Matrix4x4(-4, 2, -2, -3, 9, 6, 2, 6, 0, -5, 1, -5, 0, 0, 0, 0)
    expect(a.determinant()).toBe(0)
    expect(a.isInvertible()).toBeFalsy()
  })

  it('Calculating the inverse of a matrix', () => {
    const a = new Matrix4x4(
      -5,
      2,
      6,
      -8,
      1,
      -5,
      1,
      8,
      7,
      7,
      -6,
      -7,
      1,
      -3,
      7,
      4
    )
    const b = a.inverse()
    expect(a.determinant()).toBe(532)
    expect(a.cofactor(2, 3)).toBe(-160)
    expect(isFloatEqual(b.at(3, 2), -160 / 532)).toBeTruthy()
    expect(a.cofactor(3, 2)).toBe(105)
    expect(isFloatEqual(b.at(2, 3), 105 / 532)).toBeTruthy()
    const rb = new Matrix4x4(
      0.21805,
      0.45113,
      0.2406,
      -0.04511,
      -0.80827,
      -1.45677,
      -0.44361,
      0.52068,
      -0.07895,
      -0.22368,
      -0.05263,
      0.19737,
      -0.52256,
      -0.81391,
      -0.30075,
      0.30639
    )
    expect(b.equal(rb)).toBeTruthy()
  })

  it('Calculating the inverse of another matrix', () => {
    const a = new Matrix4x4(8, -5, 9, 2, 7, 5, 6, 1, -6, 0, 9, 6, -3, 0, -9, -4)
    const b = new Matrix4x4(
      -0.15385,
      -0.15385,
      -0.28205,
      -0.53846,
      -0.07692,
      0.12308,
      0.02564,
      0.03077,
      0.35897,
      0.35897,
      0.4359,
      0.92308,
      -0.69231,
      -0.69231,
      -0.76923,
      -1.92308
    )
    expect(a.inverse().equal(b)).toBeTruthy()
  })

  it('Calculating the inverse of a third matrix', () => {
    const a = new Matrix4x4(
      9,
      3,
      0,
      9,
      -5,
      -2,
      -6,
      -3,
      -4,
      9,
      6,
      4,
      -7,
      6,
      6,
      2
    )
    const b = new Matrix4x4(
      -0.04074,
      -0.07778,
      0.14444,
      -0.22222,
      -0.07778,
      0.03333,
      0.36667,
      -0.33333,
      -0.02901,
      -0.1463,
      -0.10926,
      0.12963,
      0.17778,
      0.06667,
      -0.26667,
      0.33333
    )
    expect(a.inverse().equal(b)).toBeTruthy()
  })

  it('Multiplying a product by its inverse', () => {
    const a = new Matrix4x4(
      3,
      -9,
      7,
      3,
      3,
      -8,
      2,
      -9,
      -4,
      4,
      4,
      1,
      -6,
      5,
      -1,
      1
    )
    const b = new Matrix4x4(8, 2, 2, 2, 3, -1, 7, 0, 7, 0, 5, 4, 6, -2, 0, 5)
    const c = a.mul(b)
    expect(c.mul(b.inverse()).equal(a)).toBeTruthy()
  })
})
