import { compareFloat } from '../util'
import { tuple, compare as compareTuple } from './tuples'
import {
  matrix4x4,
  matrixAt,
  matrix2x2,
  matrix3x3,
  compare,
  mul4x4,
  transform4,
  identity4x4,
  transpose4x4,
  determinant,
  submatrix,
  minor,
  cofactor,
  isInvertible,
  inverse,
} from './matrices'

test('constructing and inspecting a 4x4 matrix', () => {
  const m = matrix4x4(
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
  expect(compareFloat(matrixAt(m, 0, 0), 1)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 0, 3), 4)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 1, 0), 5.5)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 1, 2), 7.5)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 2, 2), 11)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 3, 0), 13.5)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 3, 2), 15.5)).toBeTruthy()
})

test('a 2x2 matrix ought to be representable', () => {
  const m = matrix2x2(-3, 5, 1, -2)
  expect(compareFloat(matrixAt(m, 0, 0), -3)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 0, 1), 5)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 1, 0), 1)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 1, 1), -2)).toBeTruthy()
})

test('a 3x3 matrix ought to be representable', () => {
  const m = matrix3x3(-3, 5, 0, 1, -2, -7, 0, 1, 1)
  expect(compareFloat(matrixAt(m, 0, 0), -3)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 1, 1), -2)).toBeTruthy()
  expect(compareFloat(matrixAt(m, 2, 2), 1)).toBeTruthy()
})

test('matrix equality with identical matrices', () => {
  const a = matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2)
  const b = matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2)
  expect(compare(a, b)).toBeTruthy()
})

test('matrix equality with different matrices', () => {
  const a = matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2)
  const b = matrix4x4(2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1)
  expect(compare(a, b)).toBeFalsy()
})

test('multiplying two matrices', () => {
  const a = matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2)
  const b = matrix4x4(-2, 1, 2, 3, 3, 2, 1, -1, 4, 3, 6, 5, 1, 2, 7, 8)
  const r = matrix4x4(
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
  expect(compare(mul4x4(a, b), r)).toBeTruthy()
})

test('a matrix multiplied by a tuple', () => {
  const a = matrix4x4(1, 2, 3, 4, 2, 4, 4, 2, 8, 6, 4, 1, 0, 0, 0, 1)
  const b = tuple(1, 2, 3, 1)
  const r = tuple(18, 24, 33, 1)
  expect(compareTuple(transform4(a, b), r)).toBeTruthy()
})

test('multiplying a matrix by the identiy matrix', () => {
  const a = matrix4x4(0, 1, 2, 4, 1, 2, 4, 8, 2, 4, 8, 16, 4, 8, 16, 32)
  expect(compare(mul4x4(a, identity4x4()), a)).toBeTruthy()
})

test('transposing a matrix', () => {
  const a = matrix4x4(0, 9, 3, 0, 9, 8, 0, 8, 1, 8, 5, 3, 0, 0, 5, 8)
  const r = matrix4x4(0, 9, 1, 0, 9, 8, 8, 0, 3, 0, 5, 5, 0, 8, 3, 8)
  expect(compare(transpose4x4(a), r)).toBeTruthy()
})

test('calculating the determinant of a 2x2 matrix', () => {
  const a = matrix2x2(1, 5, -3, 2)
  const A = 17
  expect(compareFloat(determinant(a), A)).toBeTruthy()
})

test('a submatrix of a 3x3 matrix is a 2x2 matrix', () => {
  const a = matrix3x3(1, 5, 0, -3, 2, 7, 0, 6, -3)
  const r = matrix2x2(-3, 2, 0, 6)
  expect(compare(submatrix(a, 0, 2), r)).toBeTruthy()
})

test('a submatrix of a 4x4 matrix is a 3x3 matrix', () => {
  const a = matrix4x4(-6, 1, 1, 6, -8, 5, 8, 6, -1, 0, 8, 2, -7, 1, -1, 1)
  const r = matrix3x3(-6, 1, 6, -8, 8, 6, -7, -1, 1)
  expect(compare(submatrix(a, 2, 1), r)).toBeTruthy()
})

test('calculating a minor of a 3x3 matrix', () => {
  const a = matrix3x3(3, 5, 0, 2, -1, -7, 6, -1, 5)
  const r = 25
  expect(compareFloat(minor(a, 1, 0), r)).toBeTruthy()
})

test('calculating a cofactor of a 3x3 matrix', () => {
  const a = matrix3x3(3, 5, 0, 2, -1, -7, 6, -1, 5)
  const minorA00 = -12
  const cofactorA00 = -12
  const minorA10 = 25
  const cofactorA10 = -25
  expect(compareFloat(minor(a, 0, 0), minorA00)).toBeTruthy()
  expect(compareFloat(cofactor(a, 0, 0), cofactorA00)).toBeTruthy()
  expect(compareFloat(minor(a, 1, 0), minorA10)).toBeTruthy()
  expect(compareFloat(cofactor(a, 1, 0), cofactorA10)).toBeTruthy()
})

test('calculating the determinant of a 3x3 matrix', () => {
  const a = matrix3x3(1, 2, 6, -5, 8, -4, 2, 6, 4)
  const cofactorA00 = 56
  const cofactorA01 = 12
  const cofactorA02 = -46
  const determinantA = -196
  expect(compareFloat(cofactor(a, 0, 0), cofactorA00)).toBeTruthy()
  expect(compareFloat(cofactor(a, 0, 1), cofactorA01)).toBeTruthy()
  expect(compareFloat(cofactor(a, 0, 2), cofactorA02)).toBeTruthy()
  expect(compareFloat(determinant(a), determinantA)).toBeTruthy()
})

test('calculating the determinant of a 4x4 matrix', () => {
  const a = matrix4x4(-2, -8, 3, 5, -3, 1, 7, 3, 1, 2, -9, 6, -6, 7, 7, -9)
  const cofactorA00 = 690
  const cofactorA01 = 447
  const cofactorA02 = 210
  const cofactorA03 = 51
  const determinantA = -4071
  expect(compareFloat(cofactor(a, 0, 0), cofactorA00)).toBeTruthy()
  expect(compareFloat(cofactor(a, 0, 1), cofactorA01)).toBeTruthy()
  expect(compareFloat(cofactor(a, 0, 2), cofactorA02)).toBeTruthy()
  expect(compareFloat(cofactor(a, 0, 3), cofactorA03)).toBeTruthy()
  expect(compareFloat(determinant(a), determinantA)).toBeTruthy()
})

test('testing an invertible matrix for invertibility', () => {
  const a = matrix4x4(6, 4, 4, 4, 5, 5, 7, 6, 4, -9, 3, -7, 9, 1, 7, -6)
  const determinantA = -2120
  expect(compareFloat(determinant(a), determinantA)).toBeTruthy()
  expect(isInvertible(a)).toBeTruthy()
})

test('testing a noninvertible matrix for invertibility', () => {
  const a = matrix4x4(-4, 2, -2, -3, 9, 6, 2, 6, 0, -5, 1, -5, 0, 0, 0, 0)
  const determinantA = 0
  expect(compareFloat(determinant(a), determinantA)).toBeTruthy()
  expect(isInvertible(a)).toBeFalsy()
})

test('calculating the inverse of a matrix', () => {
  const a = matrix4x4(-5, 2, 6, -8, 1, -5, 1, 8, 7, 7, -6, -7, 1, -3, 7, 4)
  const b = inverse(a)
  const determinantA = 532
  const cofactorA23 = -160
  const b32 = -160 / 532
  const cofactorA32 = 105
  const b23 = 105 / 532
  const r = matrix4x4(
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
  expect(compareFloat(determinant(a), determinantA)).toBeTruthy()
  expect(compareFloat(cofactor(a, 2, 3), cofactorA23)).toBeTruthy()
  expect(compareFloat(matrixAt(b, 3, 2), b32)).toBeTruthy()
  expect(compareFloat(cofactor(a, 3, 2), cofactorA32)).toBeTruthy()
  expect(compareFloat(matrixAt(b, 2, 3), b23)).toBeTruthy()
  expect(compare(b, r)).toBeTruthy()
})

test('calculating the inverse of another matrix', () => {
  const a = matrix4x4(8, -5, 9, 2, 7, 5, 6, 1, -6, 0, 9, 6, -3, 0, -9, -4)
  const inverseA = matrix4x4(
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
  expect(compare(inverse(a), inverseA)).toBeTruthy()
})

test('calculating the inverse of a third matrix', () => {
  const a = matrix4x4(9, 3, 0, 9, -5, -2, -6, -3, -4, 9, 6, 4, -7, 6, 6, 2)
  const inverseA = matrix4x4(
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
  expect(compare(inverse(a), inverseA)).toBeTruthy()
})

test('multiplying a product by its inverse', () => {
  const a = matrix4x4(3, -9, 7, 3, 3, -8, 2, -9, -4, 4, 4, 1, -6, 5, -1, 1)
  const b = matrix4x4(8, 2, 2, 2, 3, -1, 7, 0, 7, 0 , 5, 4, 6, -2, 0, 5)
  const c = mul4x4(a, b)
  expect(compare(mul4x4(c, inverse(b)), a)).toBeTruthy()
})
